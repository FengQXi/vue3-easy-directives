const _ = (e) => e.focus();
function p(e, t, r) {
  const o = new CustomEvent(t, {
    bubbles: !0,
    detail: r
  });
  e.dispatchEvent(o);
}
function l(e, t) {
  let r;
  return e.tagName !== t.toUpperCase() ? r = e.querySelector(t) : r = e, r;
}
const y = {
  mounted(e, t) {
    let { arg: r = "blur" } = t;
    r !== "input" && r !== "blur" && (r = "blur");
    let o = l(e, "input");
    const n = function(s) {
      const u = s.target.value.trim();
      s.target.value != u && (s.target.value = u, p(o, "input"));
    };
    e._vTrim_inputEle = o, e._vTrim_handler = n, o.addEventListener(r, n);
  },
  unmounted(e) {
    const { _vTrim_inputEle: t } = e;
    t.removeEventListener("blur", e._vTrim_handler);
  }
}, d = (e) => new Promise((t, r) => {
  let o = new Image();
  o.src = e, o.onload = () => {
    t();
  }, o.onerror = (n) => {
    r(n);
  };
}), a = new IntersectionObserver((e) => {
  e.forEach((t) => {
    if (t.isIntersecting) {
      const r = t.target;
      d(r._vLazy_value).then(() => {
        r.src = r._vLazy_value;
      }).catch((o) => {
        r._vLazy_error();
      }), a.unobserve(r);
    }
  });
}, { threshold: 0 }), f = function(e) {
  return {
    mounted(t, r) {
      t.src = e.loading, t._vLazy_value = r.value, t._vLazy_error = () => {
        t.src = e.error;
      }, a.observe(t);
    },
    unmounted(t) {
      a.unobserve(t);
    }
  };
}, w = {
  install: (e, t) => {
    e.directive("lazyLoad", f(t));
  }
}, m = {
  mounted(e, t) {
    if (t.arg === "success")
      e._vCopy_success = t.value;
    else if (t.arg === "error")
      e._vCopy_error = t.value;
    else {
      e._vCopy_value = t.value;
      const r = async function() {
        navigator.clipboard.writeText(e._vCopy_value).then(() => {
          (e._vCopy_success || typeof e._vCopy_success == "function") && e._vCopy_success();
        }).catch((o) => {
          (e._vCopy_error || typeof e._vCopy_error == "function") && e._vCopy_error(), console.error("Failed to copy text", o);
        });
      };
      e._vCopy_handler = r, e.addEventListener("click", e._vCopy_handler);
    }
  },
  updated(e, t) {
    t.arg === "success" ? e._vCopy_success = t.value : t.arg === "error" ? e._vCopy_error = t.value : e._vCopy_value = t.value;
  },
  unmounted(e) {
    e.removeEventListener("click", e._vCopy_handler);
  }
}, C = 150, h = 1e3, v = /* @__PURE__ */ new WeakMap(), c = new IntersectionObserver((e) => {
  e.forEach((t) => {
    if (t.isIntersecting) {
      const r = t.target, o = v.get(r);
      o == null || o.play(), c.unobserve(r);
    }
  });
});
function g(e) {
  const t = e.getBoundingClientRect();
  return t.top > window.innerHeight && t.bottom > 0;
}
const E = {
  mounted(e) {
    if (!g(e))
      return;
    const t = e.animate([
      {
        transform: `translateY(${C}px)`,
        opacity: 0.5
      },
      {
        transfrom: "translateY(0)",
        opacity: 1
      }
    ], {
      duration: h,
      easing: "ease"
    });
    t.pause(), v.set(e, t), c.observe(e);
  },
  unmounted(e) {
    c.unobserve(e);
  }
}, i = {
  focus: _,
  trim: y,
  copy: m,
  slideIn: E
}, L = {
  install: (e) => {
    Object.keys(i).forEach((t) => {
      e.directive(t, i[t]);
    });
  }
};
export {
  m as copy,
  L as default,
  _ as focus,
  w as lazyLoad,
  E as slideIn,
  y as trim
};
