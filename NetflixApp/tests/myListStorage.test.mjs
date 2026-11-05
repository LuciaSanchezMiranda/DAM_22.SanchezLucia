import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../services/myListStorage.js', import.meta.url), 'utf8');
const { createMyListStorage, MY_LIST_KEY } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const movie = { id: '1', title: 'El Irlandés', year: '2019', image: 'https://example.com/poster.jpg' };

function memoryStorage(initial = null) {
  let raw = initial;
  return {
    async getItem(key) { assert.equal(key, MY_LIST_KEY); return raw; },
    async setItem(key, value) { assert.equal(key, MY_LIST_KEY); raw = value; },
  };
}

test('primera ejecución: lista vacía', async () => {
  assert.deepEqual(await createMyListStorage(memoryStorage()).load(), []);
});

test('recupera títulos con un nuevo servicio y conserva la eliminación', async () => {
  const device = memoryStorage();
  await createMyListStorage(device).save([movie]);
  const reopened = createMyListStorage(device);
  assert.deepEqual(await reopened.load(), [movie]);
  await reopened.save([]);
  assert.deepEqual(await createMyListStorage(device).load(), []);
});

test('no duplica títulos ni confunde el destacado con El Irlandés', async () => {
  const storage = createMyListStorage(memoryStorage());
  const featured = { ...movie, id: 'featured-stranger-things', title: 'STRANGER THINGS' };
  await storage.save([movie, movie, featured]);
  assert.deepEqual(await storage.load(), [movie, featured]);
});

test('guarda únicamente campos del catálogo', async () => {
  const storage = createMyListStorage(memoryStorage());
  await storage.save([{ ...movie, password: 'never-store', email: 'never-store' }]);
  assert.deepEqual(await storage.load(), [movie]);
});

test('datos corruptos: falla la lectura sin sobrescribirlos', async () => {
  for (const invalid of ['{', '{}', '[{"id":"1"}]']) {
    const device = memoryStorage(invalid);
    await assert.rejects(createMyListStorage(device).load());
    assert.equal(await device.getItem(MY_LIST_KEY), invalid);
  }
});

test('propaga fallos de lectura y escritura para que la pantalla informe al usuario', async () => {
  const storage = createMyListStorage({
    async getItem() { throw new Error('read failed'); },
    async setItem() { throw new Error('write failed'); },
  });
  await assert.rejects(storage.load(), /read failed/);
  await assert.rejects(storage.save([movie]), /write failed/);
});
