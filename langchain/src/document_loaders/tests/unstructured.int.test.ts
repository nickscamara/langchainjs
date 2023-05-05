import * as url from "node:url";
import * as path from "node:path";
import { test, expect } from "@jest/globals";
import {
  UnstructuredDirectoryLoader,
  UnstructuredLoader,
  UnknownHandling,
} from "../fs/unstructured.js";

test("Test Unstructured base loader", async () => {
  const filePath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "./example_data/example.txt"
  );

  const loader = new UnstructuredLoader(
    "https://api.unstructured.io/general/v0/general",
    filePath
  );
  const docs = await loader.load();

  expect(docs.length).toBe(3);
  for (const doc of docs) {
    expect(typeof doc.pageContent).toBe("string");
  }
});

test("Test Unstructured directory loader", async () => {
  const directoryPath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "./example_data"
  );

  const loader = new UnstructuredDirectoryLoader(
    "https://api.unstructured.io/general/v0/general",
    directoryPath,
    true,
    UnknownHandling.Ignore
  );
  const docs = await loader.load();

  expect(docs.length).toBe(619);
  expect(typeof docs[0].pageContent).toBe("string");
});
