import { S3KeyValueDatabase } from './s3-client.js';

async function main() {
  const db = new S3KeyValueDatabase();

  // Number of parallel operations to perform
  const numOperations = 10; // Adjust this based on your testing needs

  // Generate random keys and values for testing
  const keys = Array.from({ length: numOperations }, (_, i) => `project:analysis:id${i + 1}`);
  const values = Array.from({ length: numOperations }, (_, i) => ({ name: `User ${i + 1}`, age: Math.floor(Math.random() * 100) }));

  // Parallel SET operations
  const setStartTime = Date.now();
  await Promise.all(keys.map((key, index) => db.set(key, values[index])));
  const setEndTime = Date.now();
  console.log(`SET ${numOperations} keys in ${setEndTime - setStartTime} ms`);

  // Parallel GET operations
  const getStartTime = Date.now();
  const retrievedValues = await Promise.all(keys.map((key) => db.get(key)));
  const getEndTime = Date.now();
  console.log(`GET ${numOperations} keys in ${getEndTime - getStartTime} ms`);

  // Verify retrieved values
  const allValuesMatch = retrievedValues.every((value, index) => JSON.stringify(value) === JSON.stringify(values[index]));
  console.log('All retrieved values match:', allValuesMatch);

  // Parallel LIST operations (list keys with prefix)
  const listStartTime = Date.now();
  const listedKeys = await db.listKeys('project:analysis');
  const listEndTime = Date.now();
  console.log(`LIST keys with prefix "project:analysis" in ${listEndTime - listStartTime} ms`);
  // console.log('Listed keys:', listedKeys);

  // Parallel DELETE operations
  const deleteStartTime = Date.now();
  await Promise.all(keys.map((key) => db.delete(key)));
  const deleteEndTime = Date.now();
  console.log(`DELETE ${numOperations} keys in ${deleteEndTime - deleteStartTime} ms`);

  // Verify deletion
  const deletedValues = await Promise.all(keys.map((key) => db.get(key)));
  const allKeysDeleted = deletedValues.every((value) => value === null);
  console.log('All keys deleted:', allKeysDeleted);
}

main().catch((error) => {
  console.error('Error:', error);
});