interface CustomObj {
  [key: string | number]: any;
}

function isEqual(value1: any, value2: any) {
  if (typeof value1 !== typeof value2) {
    return false;
  }
  if (typeof value1 === "object") {
    return isEqualObject(value1, value2);
  }
  return value1 === value2;
}

function isEqualObject(obj1: CustomObj, obj2: CustomObj) {
  const props1 = Object.getOwnPropertyNames(obj1);
  const props2 = Object.getOwnPropertyNames(obj2);

  if (props1.length !== props2.length) {
    return false;
  }

  for (let i = 0; i < props1.length; i++) {
    const prop = props1[i];
    const bothAreObjects =
      typeof obj1[prop] === "object" && typeof obj2[prop] === "object";

    if (
      (!bothAreObjects && obj1[prop] !== obj2[prop]) ||
      (bothAreObjects && !isEqualObject(obj1[prop], obj2[prop]))
    ) {
      return false;
    }
  }
  return true;
}

export default isEqual;
