import { Metadata } from "@scalable.software/graph";

const metadata = Metadata.create()
  .add({
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "test",
  })
  .update({
    name: "test",
    custom: "custom",
  })
  .remove(["custom"])
  .update({
    type: "type",
  });

console.log(metadata.toJSON());
