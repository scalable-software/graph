export const define = (tag: string, component) =>
  !customElements.get(tag) && customElements.define(tag, component);

export const whenDefined = async (tag) => await customElements.whenDefined(tag);

export const create = <T extends Element>(tag) =>
  document.createElement(tag) as T;

export const setAttributes = (element, attributes) => (
  Object.entries(attributes).forEach(([name, value]) =>
    element.setAttribute(name, value)
  ),
  element
);

export const add = <T extends Element>(tag, attributes?: any): T =>
  append(
    attributes != null
      ? setAttributes(create<T>(tag), attributes)
      : create<T>(tag)
  );

export const append = (element) => document.body.appendChild(element);

export const remove = (id) =>
  (<HTMLElement>document.getElementById(id)).remove();

export const importTemplate = async (templateUrl) => {
  try {
    const response = await fetch(templateUrl);
    const html = await response.text();
    const template = new DOMParser()
      .parseFromString(html, "text/html")
      .querySelector("template");
    document.body.appendChild(template as Node);
  } catch (error) {
    console.warn("Error fetching external template:", error);
  }
};

export const appendTemplate = (id, template?) => {
  let HTMLTemplate: HTMLTemplateElement = document.createElement("template");
  HTMLTemplate.innerHTML = template ?? "";
  HTMLTemplate.id = id;
  document.body.appendChild(HTMLTemplate);
  return HTMLTemplate;
};

export const hasSetter = (obj, propName) => {
  while (obj) {
    let descriptor = Object.getOwnPropertyDescriptor(obj, propName);
    if (descriptor) return !!descriptor.set;
    obj = Object.getPrototypeOf(obj);
  }
  return false;
};

export const Type = {
  CLASS: "class",
  CONSTRUCTOR: "constructor",
  PROPERTY: "property",
  METHOD: "method",
  ACCESSOR: "accessor",
  STATIC_PROPERTY: "static property",
  STATIC_METHOD: "static method",
  GETTER: "getter",
  SETTER: "setter",
  ABSTRACT_CLASS: "abstract class",
};

export const Test = {
  AVAILABILITY: "availability",
  INSTANTIATION: "instantiation",
  BEHAVIOR: "behavior",
};

export const Report = {
  Type: "type",
  Test: "test",
  Context: "context",
};

export const metadata = (str) => {
  const parts = str.trim().split(/\s+/);

  return {
    context: parts[0],
    type: parts.slice(1, -2).join(" "),
    test: parts[parts.length - 2],
  };
};
