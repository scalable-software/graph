import { Pin } from "@scalable.software/graph";

await Pin.Template.load("Pin.template.html");
customElements.define(Pin.Tag, Pin);
