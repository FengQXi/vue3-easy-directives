const s = (c) => c.focus(), t = {
  focus: s
}, o = {
  install: (c) => {
    Object.keys(t).forEach((e) => {
      c.directive(e);
    });
  }
};
export {
  o as default,
  s as focus
};
