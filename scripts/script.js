/* #region Splash Screen */
document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");

  const showMainContent = () => {
    // Efek fade out untuk splash screen
    splashScreen.classList.add("opacity-0");
    // Setelah efek selesai, sembunyikan total dan tampilkan konten
    setTimeout(() => {
      splashScreen.classList.add("hidden");
    }, 900); // Durasi transisi opacity
  };

  // Cek apakah splash screen sudah pernah ditampilkan di sesi ini
  if (sessionStorage.getItem("splashShown") === "true") {
    // Jika sudah, langsung tampilkan konten utama
    splashScreen.classList.add("hidden");
  } else {
    // Jika belum, tampilkan splash screen selama 3 detik
    setTimeout(() => {
      sessionStorage.setItem("splashShown", "true"); // Tandai sudah ditampilkan
      showMainContent();
    }, 3000); // 3000 milidetik = 3 detik
  }
});
/* #endregion */

(function (_0x27fee9, _0x4383d5) {
  function _0x1c957b(_0x48be0d, _0x5c6538, _0x55593b, _0x12965d) {
    return _0x1fa2(_0x55593b - 0x24d, _0x12965d);
  }
  const _0x538328 = _0x27fee9();
  function _0x545943(_0xe9d967, _0x4a9188, _0x4be95b, _0x245e43) {
    return _0x1fa2(_0x4a9188 - 0x254, _0x245e43);
  }
  while (!![]) {
    try {
      const _0x4fb49d =
        parseInt(_0x1c957b(0x456, 0x484, 0x45e, 0x42b)) /
          (0x5 * -0x581 + 0x759 + 0x142d) +
        (-parseInt(_0x545943(0x4b8, 0x478, 0x44c, 0x4a8)) /
          (0x1d92 + 0xa02 + -0xa * 0x3f5)) *
          (parseInt(_0x1c957b(0x4f5, 0x4df, 0x4b3, 0x4e5)) /
            (-0x1e01 * -0x1 + -0x131c + -0xae2)) +
        (parseInt(_0x545943(0x41c, 0x453, 0x46b, 0x40c)) /
          (-0x3c8 * 0x1 + -0x2188 + 0x12aa * 0x2)) *
          (-parseInt(_0x1c957b(0x464, 0x453, 0x451, 0x492)) /
            (-0x1e7 * 0x10 + -0x1e * 0xeb + 0x39ff)) +
        (-parseInt(_0x545943(0x406, 0x43d, 0x427, 0x3fb)) /
          (0xde7 * -0x1 + -0x227e + -0x14f * -0x25)) *
          (-parseInt(_0x1c957b(0x405, 0x3f7, 0x434, 0x42e)) /
            (-0x6e + -0x34a + -0x89 * -0x7)) +
        parseInt(_0x545943(0x460, 0x48b, 0x4ad, 0x49c)) /
          (-0x171d + 0x2 * -0x699 + -0x7 * -0x531) +
        (parseInt(_0x545943(0x460, 0x484, 0x454, 0x468)) /
          (-0x1a2 + -0x179f + 0x194a)) *
          (-parseInt(_0x545943(0x422, 0x440, 0x417, 0x46d)) /
            (-0x919 + -0x1272 + -0x1b95 * -0x1)) +
        parseInt(_0x1c957b(0x45c, 0x426, 0x46a, 0x423)) /
          (0x23fa + 0x11fa + -0x35e9);
      if (_0x4fb49d === _0x4383d5) break;
      else _0x538328["push"](_0x538328["shift"]());
    } catch (_0x39e0ed) {
      _0x538328["push"](_0x538328["shift"]());
    }
  }
})(_0x531c, -0x25 * -0x59ff + 0x76bf * 0x17 + 0x1 * -0xe2925);
const _0xadef3c = (function () {
    const _0x4d5233 = {};
    _0x4d5233[_0xd3da99(0x577, 0x552, 0x562, 0x546)] = function (
      _0x305c65,
      _0x254724
    ) {
      return _0x305c65 !== _0x254724;
    };
    function _0xd3da99(_0x55be07, _0x172171, _0x295684, _0x230903) {
      return _0x1fa2(_0x295684 - 0x30d, _0x230903);
    }
    _0x4d5233[_0xd3da99(0x523, 0x578, 0x55c, 0x54f)] = _0x198539(
      0x3d7,
      0x406,
      0x3f1,
      0x3d9
    );
    function _0x198539(_0x5ccac6, _0x16badd, _0x26fcab, _0x196032) {
      return _0x1fa2(_0x196032 - 0x1e9, _0x26fcab);
    }
    _0x4d5233[_0xd3da99(0x549, 0x4db, 0x51d, 0x544)] = _0x198539(
      0x41e,
      0x3e2,
      0x45a,
      0x41c
    );
    const _0xfd934d = _0x4d5233;
    let _0x184830 = !![];
    return function (_0x7233fa, _0x1acdfb) {
      const _0x29f0a1 = _0x184830
        ? function () {
            function _0x402020(_0x11e17e, _0x3b6904, _0x440ce0, _0x2d3eb9) {
              return _0x1fa2(_0x2d3eb9 - -0xfb, _0x440ce0);
            }
            function _0x2f16a2(_0x290173, _0x3a1719, _0x442ee8, _0x239ac1) {
              return _0x1fa2(_0x290173 - 0x2f, _0x239ac1);
            }
            if (
              _0xfd934d[_0x2f16a2(0x284, 0x29b, 0x245, 0x2b2)](
                _0xfd934d["vgLne"],
                _0xfd934d[_0x402020(0xd6, 0x146, 0x10b, 0x115)]
              )
            ) {
              if (_0x1acdfb) {
                const _0x4919ee = _0x1acdfb["apply"](_0x7233fa, arguments);
                return (_0x1acdfb = null), _0x4919ee;
              }
            } else {
              const _0x4ffb7a = _0x23c4c1[
                _0x2f16a2(0x21e, 0x1e3, 0x1e4, 0x1f6)
              ](_0x31b337, arguments);
              return (_0x99aeb8 = null), _0x4ffb7a;
            }
          }
        : function () {};
      return (_0x184830 = ![]), _0x29f0a1;
    };
  })(),
  _0x150600 = _0xadef3c(this, function () {
    function _0x38c2fd(_0x1aa58a, _0x257d45, _0x131ff1, _0x480ea1) {
      return _0x1fa2(_0x1aa58a - -0x16, _0x257d45);
    }
    const _0xb6c044 = {};
    function _0x37f275(_0x154eb6, _0x539bf2, _0x4972f3, _0x34f727) {
      return _0x1fa2(_0x154eb6 - 0x16e, _0x34f727);
    }
    _0xb6c044[_0x38c2fd(0x247, 0x24f, 0x21f, 0x205)] =
      _0x38c2fd(0x246, 0x253, 0x21e, 0x224) + "+$";
    const _0xfb9edc = _0xb6c044;
    return _0x150600[_0x38c2fd(0x22f, 0x215, 0x273, 0x21e)]()
      [_0x38c2fd(0x249, 0x26c, 0x27f, 0x208)]("(((.+)+)+)" + "+$")
      [_0x38c2fd(0x22f, 0x1fe, 0x1f0, 0x1ee)]()
      ["constructo" + "r"](_0x150600)
      ["search"](_0xfb9edc[_0x37f275(0x3cb, 0x39c, 0x3a1, 0x3b0)]);
  });
_0x150600();
const _0x42853d = (function () {
    let _0x3823b4 = !![];
    return function (_0x3fb612, _0x3d6716) {
      const _0x3b3fc2 = _0x3823b4
        ? function () {
            function _0x543d8(_0x3ab480, _0x216f77, _0x4a64a7, _0x222e05) {
              return _0x1fa2(_0x222e05 - -0x3c7, _0x4a64a7);
            }
            if (_0x3d6716) {
              const _0x2ddfc6 = _0x3d6716[
                _0x543d8(-0x1e3, -0x1c8, -0x19f, -0x1d8)
              ](_0x3fb612, arguments);
              return (_0x3d6716 = null), _0x2ddfc6;
            }
          }
        : function () {};
      return (_0x3823b4 = ![]), _0x3b3fc2;
    };
  })(),
  _0x3f7873 = _0x42853d(this, function () {
    const _0x884be7 = {
        hRitd: function (_0x3b346d, _0x3c8162) {
          return _0x3b346d === _0x3c8162;
        },
        XRPEW: _0x5c2db7(0x135, 0x16c, 0x152, 0x14c),
        xhJkZ: function (_0x1ff68a, _0x3a1b19) {
          return _0x1ff68a(_0x3a1b19);
        },
        uIELi: function (_0x4ab88b, _0x33fc49) {
          return _0x4ab88b + _0x33fc49;
        },
        LrTgr:
          _0x4f0adf(-0x84, -0x7a, -0x7a, -0x75) +
          _0x5c2db7(0x10d, 0x108, 0x165, 0x139),
        oMeqn:
          "{}.constru" +
          "ctor(\x22retu" +
          _0x5c2db7(0x16d, 0x13c, 0x165, 0x168) +
          "\x20)",
        lHlJa: function (_0x4b0505, _0x242004) {
          return _0x4b0505 + _0x242004;
        },
        QgZtI: function (_0x411857) {
          return _0x411857();
        },
        arNRn: _0x4f0adf(-0xd8, -0x99, -0xea, -0xd0),
        EmLAv: _0x5c2db7(0x152, 0x184, 0x17e, 0x155),
        njSqb: function (_0x1b0b78, _0x2aea0a) {
          return _0x1b0b78 < _0x2aea0a;
        },
        AofXk: function (_0x14da7c, _0x55bc6f) {
          return _0x14da7c !== _0x55bc6f;
        },
        OThyu: _0x5c2db7(0x155, 0x167, 0x150, 0x17d),
        hEZVO: _0x4f0adf(-0x4a, -0x54, -0xc0, -0x89),
        XMYrd: function (_0x2f0b5f, _0x3b7ddf) {
          return _0x2f0b5f != _0x3b7ddf;
        },
        OHCYH: function (_0x30d617, _0x1bf19a) {
          return _0x30d617 !== _0x1bf19a;
        },
        IQhLI: _0x5c2db7(0x1b6, 0x197, 0x1f7, 0x1c7),
        fBpHM: _0x5c2db7(0x193, 0x1b2, 0x1a2, 0x1be),
        BvUEt: function (_0x8d13df, _0x93b394) {
          return _0x8d13df < _0x93b394;
        },
        ogGdm: "MRUIv",
        vIEOR: function (_0x3a6d5e, _0x3424f6) {
          return _0x3a6d5e == _0x3424f6;
        },
        xqhcj: function (_0x314c88, _0x5edc46) {
          return _0x314c88 != _0x5edc46;
        },
        XFnOR: function (_0x35b445, _0x49410a) {
          return _0x35b445 + _0x49410a;
        },
        vIqZH: function (_0x4dfcba, _0x2231ad, _0x143c3d, _0x28d281) {
          return _0x4dfcba(_0x2231ad, _0x143c3d, _0x28d281);
        },
        hsvjt: function (_0x576a49, _0x3172c0, _0x4096a8, _0x1cc919) {
          return _0x576a49(_0x3172c0, _0x4096a8, _0x1cc919);
        },
        GdRTS: function (_0x43ad81, _0x334a87) {
          return _0x43ad81 + _0x334a87;
        },
        LolWg:
          _0x5c2db7(0x1f0, 0x16a, 0x18a, 0x1aa) +
          _0x5c2db7(0x113, 0x120, 0x11b, 0x15c) +
          _0x5c2db7(0x182, 0x166, 0x167, 0x146) +
          "OYFSZ]",
        nmDTF:
          "DkprRhFemx" +
          _0x5c2db7(0x197, 0x1a4, 0x170, 0x1ac) +
          _0x4f0adf(-0x49, -0x70, -0xb7, -0x7e) +
          _0x5c2db7(0x186, 0x10d, 0x12e, 0x154) +
          _0x5c2db7(0x17e, 0x149, 0x13c, 0x14b),
        hGdDZ: function (_0xbef503, _0xa46c4a) {
          return _0xbef503 !== _0xa46c4a;
        },
        oPEMv: "alKQZ",
        fbLKc: _0x5c2db7(0x1f0, 0x19d, 0x1a8, 0x1c6),
        RIPBj: _0x5c2db7(0x14c, 0x114, 0x141, 0x150),
        LsoWz: function (_0x55ce12, _0x414501, _0xf8ea02, _0x2dff10) {
          return _0x55ce12(_0x414501, _0xf8ea02, _0x2dff10);
        },
        DyPvf: function (_0x42285b, _0x52830a, _0x1cd7fa, _0x59548b) {
          return _0x42285b(_0x52830a, _0x1cd7fa, _0x59548b);
        },
        IbFYB: "ihApk",
        mSGYI: _0x5c2db7(0x1d5, 0x16c, 0x181, 0x194),
        ZPiAJ: function (_0xfaedd3, _0xf1ffbe) {
          return _0xfaedd3 > _0xf1ffbe;
        },
        cpcbX: _0x5c2db7(0x1cc, 0x1bc, 0x1ca, 0x18a),
        FjruY: function (_0x97a804, _0xf58015) {
          return _0x97a804 || _0xf58015;
        },
        okMJh: function (_0x4918c1, _0xb163b0) {
          return _0x4918c1 < _0xb163b0;
        },
        ZgXxl: function (_0x1763ce, _0x14e6ec) {
          return _0x1763ce !== _0x14e6ec;
        },
        OVUIs: _0x5c2db7(0x184, 0x1bd, 0x191, 0x1b9),
        hsYYt: function (_0x49047b, _0x1c2ceb) {
          return _0x49047b - _0x1c2ceb;
        },
        GycvL: function (_0x8cf0d5, _0x1b451b) {
          return _0x8cf0d5 !== _0x1b451b;
        },
        RlveZ: function (_0x18a8dc, _0x37edb9) {
          return _0x18a8dc == _0x37edb9;
        },
        cmCQQ: function (_0x34f4d8, _0x367c04) {
          return _0x34f4d8 === _0x367c04;
        },
        opumo:
          _0x5c2db7(0x1b4, 0x1a1, 0x1cb, 0x18e) +
          _0x4f0adf(-0xa8, -0x85, -0x81, -0xad) +
          _0x4f0adf(-0xbc, -0x7a, -0x8f, -0xb4) +
          "s]",
        RrFuu:
          _0x4f0adf(-0xe2, -0xe8, -0x74, -0xb5) +
          "ZblHBanFkq" +
          _0x5c2db7(0x16c, 0x122, 0x180, 0x162) +
          _0x5c2db7(0x171, 0x13d, 0x170, 0x15b) +
          "s",
      },
      _0x530c63 = function () {
        let _0x2a2a69;
        try {
          if (
            _0x884be7[_0x53d1aa(0x290, 0x298, 0x2ae, 0x2d4)](
              _0x53d1aa(0x237, 0x257, 0x1f8, 0x1fe),
              _0x884be7[_0x1f1fc8(0x18e, 0x1ab, 0x179, 0x193)]
            )
          )
            return;
          else
            _0x2a2a69 = _0x884be7["xhJkZ"](
              Function,
              _0x884be7["uIELi"](
                _0x884be7[_0x1f1fc8(0x235, 0x1ee, 0x231, 0x205)] +
                  _0x884be7[_0x1f1fc8(0x1ea, 0x1c0, 0x17f, 0x1ba)],
                ");"
              )
            )();
        } catch (_0x1e8a7e) {
          _0x2a2a69 = window;
        }
        function _0x1f1fc8(_0x2c4707, _0x4a0c0c, _0x5ae91b, _0x3cc70e) {
          return _0x4f0adf(
            _0x2c4707 - 0xbf,
            _0x4a0c0c - 0x1a9,
            _0x2c4707,
            _0x3cc70e - 0x260
          );
        }
        function _0x53d1aa(_0x4eefd9, _0x4667a8, _0x46dc6d, _0x169c53) {
          return _0x5c2db7(
            _0x169c53,
            _0x4667a8 - 0x1cf,
            _0x46dc6d - 0x3e,
            _0x4eefd9 - 0xef
          );
        }
        return _0x2a2a69;
      },
      _0x43fede = _0x884be7["QgZtI"](_0x530c63),
      _0xe89456 = new RegExp(
        _0x884be7[_0x4f0adf(-0x20, -0xa2, -0x84, -0x64)],
        "g"
      ),
      _0x5a9482 = _0x884be7[_0x5c2db7(0x1ad, 0x171, 0x132, 0x172)]
        [_0x4f0adf(-0x3a, -0x51, -0x55, -0x59)](_0xe89456, "")
        [_0x4f0adf(-0x69, -0x92, -0x50, -0x6f)](";");
    let _0x5d2809, _0x1ced78, _0x452c3f, _0x49cb99;
    function _0x4f0adf(_0x1689b2, _0x3dc4cd, _0x129e2b, _0x3511eb) {
      return _0x1fa2(_0x3511eb - -0x2bb, _0x129e2b);
    }
    const _0x185a6c = function (_0x3b3b7d, _0x3d7338, _0x3315d0) {
        function _0x2de4d5(_0x26b3a2, _0x19d13d, _0x3db570, _0x3342f2) {
          return _0x5c2db7(
            _0x3db570,
            _0x19d13d - 0x19c,
            _0x3db570 - 0xd6,
            _0x3342f2 - -0x105
          );
        }
        const _0xa06250 = {
          sVnbu: function (_0x449e9a, _0x4a971f) {
            function _0x31fb9d(_0x418f05, _0xbdf308, _0x332159, _0x1bfd14) {
              return _0x1fa2(_0x1bfd14 - 0x130, _0xbdf308);
            }
            return _0x884be7[_0x31fb9d(0x3ac, 0x3ca, 0x3ab, 0x398)](
              _0x449e9a,
              _0x4a971f
            );
          },
          oMROE: function (_0x3e04dc, _0x4840a6) {
            function _0x2eb1d1(_0x2984af, _0x46f50c, _0x512e6f, _0x38b73f) {
              return _0x1fa2(_0x512e6f - 0x1b0, _0x2984af);
            }
            return _0x884be7[_0x2eb1d1(0x3f3, 0x42e, 0x418, 0x3d2)](
              _0x3e04dc,
              _0x4840a6
            );
          },
          ShXsb: _0x884be7["LrTgr"],
          MuXyp: _0x884be7[_0x380ee6(0x3f1, 0x424, 0x41a, 0x3e7)],
          Yiwom: function (_0x446cb3) {
            function _0x40ec27(_0x1962dc, _0x40ab4a, _0x161934, _0x433319) {
              return _0x380ee6(
                _0x161934,
                _0x40ab4a - 0x1f1,
                _0x161934 - 0xca,
                _0x1962dc - -0x418
              );
            }
            return _0x884be7[_0x40ec27(-0x53, -0x1b, -0x38, -0x90)](_0x446cb3);
          },
          SNyGL: _0x2de4d5(0x2d, 0x70, 0x5f, 0x4d),
          oCVCx: _0x2de4d5(0x9f, 0x6c, 0x6e, 0xa1),
          AoNVG: _0x884be7[_0x2de4d5(0x6a, 0x9f, 0x9e, 0x8e)],
          cathk: _0x884be7["EmLAv"],
          ulsuk: function (_0x50e82c, _0x32469d) {
            function _0x2e53ac(_0x5787b8, _0x5142bf, _0x32f26f, _0x347c8e) {
              return _0x380ee6(
                _0x5787b8,
                _0x5142bf - 0x173,
                _0x32f26f - 0x27,
                _0x5142bf - -0xc
              );
            }
            return _0x884be7[_0x2e53ac(0x377, 0x3b7, 0x3c6, 0x370)](
              _0x50e82c,
              _0x32469d
            );
          },
        };
        function _0x380ee6(_0x560a48, _0x515aff, _0x50d120, _0x4507df) {
          return _0x4f0adf(
            _0x560a48 - 0x1b2,
            _0x515aff - 0x7f,
            _0x560a48,
            _0x4507df - 0x48d
          );
        }
        if (
          _0x884be7[_0x2de4d5(0x10, 0x30, 0x73, 0x4c)](
            _0x884be7[_0x2de4d5(0x15, 0x91, 0x39, 0x5b)],
            _0x884be7["hEZVO"]
          )
        ) {
          if (
            _0x884be7[_0x2de4d5(0x6d, 0xcf, 0x97, 0x93)](
              _0x3b3b7d[_0x2de4d5(0xe0, 0x66, 0x84, 0x9a)],
              _0x3d7338
            )
          ) {
            if (_0x884be7["OHCYH"](_0x884be7["IQhLI"], _0x884be7["fBpHM"]))
              return ![];
            else {
              if (_0x3a72b7) {
                const _0x3a20a0 = _0x205843[
                  _0x380ee6(0x3b7, 0x37e, 0x40a, 0x3c1)
                ](_0x479b50, arguments);
                return (_0x10e91e = null), _0x3a20a0;
              }
            }
          }
          for (
            let _0xef54b8 = -0x1795 + 0x13ca + 0x3cb;
            _0x884be7[_0x2de4d5(0x82, 0x76, 0xd3, 0xb8)](_0xef54b8, _0x3d7338);
            _0xef54b8++
          ) {
            if (
              _0x884be7[_0x380ee6(0x3e0, 0x3ec, 0x3da, 0x3fa)] !==
              _0x2de4d5(0x68, 0xc3, 0xc3, 0x7c)
            ) {
              let _0x3775d8;
              try {
                _0x3775d8 = _0x396408(
                  _0x884be7[_0x2de4d5(0xab, 0x8e, 0xe3, 0xb7)](
                    _0x884be7[_0x380ee6(0x3dc, 0x420, 0x42b, 0x3f1)](
                      _0x884be7[_0x2de4d5(0x93, 0xb7, 0x71, 0xaf)],
                      _0x884be7["oMeqn"]
                    ),
                    ");"
                  )
                )();
              } catch (_0x38cbee) {
                _0x3775d8 = _0x4a9d1b;
              }
              return _0x3775d8;
            } else
              for (
                let _0x382039 = 0x5ad * 0x4 + -0x1c4a * 0x1 + 0x596;
                _0x884be7["BvUEt"](_0x382039, _0x3315d0["length"]);
                _0x382039 += 0xe35 + -0x5f2 + -0x841 * 0x1
              ) {
                if (
                  _0x884be7["vIEOR"](_0xef54b8, _0x3315d0[_0x382039]) &&
                  _0x884be7[_0x380ee6(0x3e9, 0x42f, 0x443, 0x403)](
                    _0x3b3b7d[_0x2de4d5(0x42, 0x27, 0x9c, 0x62)](_0xef54b8),
                    _0x3315d0[
                      _0x884be7[_0x380ee6(0x3b2, 0x3fb, 0x3e2, 0x3df)](
                        _0x382039,
                        0xd0a * 0x1 + 0x1f85 + -0x6 * 0x76d
                      )
                    ]
                  )
                )
                  return ![];
              }
          }
          return !![];
        } else {
          let _0x19fe64;
          try {
            const _0x59486d = _0x506e3c(
              _0xa06250[_0x380ee6(0x3a3, 0x3f9, 0x410, 0x3e1)](
                _0xa06250[_0x2de4d5(0x3b, 0xbb, 0x30, 0x75)](
                  _0xa06250[_0x380ee6(0x412, 0x40a, 0x46a, 0x425)],
                  _0xa06250[_0x380ee6(0x3d6, 0x3eb, 0x3a5, 0x3e8)]
                ),
                ");"
              )
            );
            _0x19fe64 =
              _0xa06250[_0x380ee6(0x399, 0x387, 0x38f, 0x3c8)](_0x59486d);
          } catch (_0x558106) {
            _0x19fe64 = _0x328f0f;
          }
          const _0x4e9334 = (_0x19fe64[_0x2de4d5(0x37, 0xa6, 0x9f, 0x69)] =
              _0x19fe64["console"] || {}),
            _0x5c8e6e = [
              _0xa06250["SNyGL"],
              _0xa06250[_0x2de4d5(0xdb, 0x86, 0x7b, 0x96)],
              _0x380ee6(0x3e7, 0x3f2, 0x3b9, 0x3fe),
              _0x380ee6(0x401, 0x3ff, 0x42e, 0x439),
              _0x2de4d5(0x50, 0x6b, 0x39, 0x49),
              _0xa06250[_0x380ee6(0x3a3, 0x3b7, 0x3c7, 0x3e9)],
              _0xa06250[_0x380ee6(0x41c, 0x3fa, 0x3f1, 0x3e4)],
            ];
          for (
            let _0x1fabf5 = 0x1 * -0x1f0b + 0x9ab + 0x390 * 0x6;
            _0xa06250[_0x2de4d5(0x49, 0x61, 0x71, 0x72)](
              _0x1fabf5,
              _0x5c8e6e["length"]
            );
            _0x1fabf5++
          ) {
            const _0x5be942 =
                _0x42c01f[_0x2de4d5(0x8d, 0x43, 0x89, 0x6f) + "r"][
                  _0x2de4d5(0x4e, 0xb1, 0x90, 0x92)
                ][_0x380ee6(0x466, 0x42a, 0x438, 0x435)](_0x4d92e5),
              _0x2b6fe0 = _0x5c8e6e[_0x1fabf5],
              _0x26b4d3 = _0x4e9334[_0x2b6fe0] || _0x5be942;
            (_0x5be942[_0x380ee6(0x3fc, 0x427, 0x435, 0x43e)] =
              _0x27b62a[_0x380ee6(0x45d, 0x3f3, 0x415, 0x435)](_0x3f41fd)),
              (_0x5be942[_0x2de4d5(0xaa, 0xa1, 0x76, 0x94)] =
                _0x26b4d3[_0x380ee6(0x440, 0x3dc, 0x40e, 0x417)][
                  _0x380ee6(0x46d, 0x401, 0x44b, 0x435)
                ](_0x26b4d3)),
              (_0x4e9334[_0x2b6fe0] = _0x5be942);
          }
        }
      },
      _0x15cbec = function (_0x1c0188, _0x1bdcf4, _0x368419) {
        function _0x4c3f6b(_0xbee5b0, _0x1f2b48, _0xce2285, _0x4de059) {
          return _0x4f0adf(
            _0xbee5b0 - 0x14f,
            _0x1f2b48 - 0x193,
            _0xbee5b0,
            _0x1f2b48 - 0x49f
          );
        }
        return _0x884be7[_0x4c3f6b(0x418, 0x41c, 0x40d, 0x3dc)](
          _0x185a6c,
          _0x1bdcf4,
          _0x368419,
          _0x1c0188
        );
      },
      _0x150fa3 = function (_0x24cc38, _0x18f974, _0x30c217) {
        return _0x884be7["vIqZH"](_0x15cbec, _0x18f974, _0x24cc38, _0x30c217);
      },
      _0x5ee714 = function (_0x2baf62, _0x1df07a, _0x2278ba) {
        return _0x884be7["hsvjt"](_0x150fa3, _0x1df07a, _0x2278ba, _0x2baf62);
      };
    for (let _0x592e1c in _0x43fede) {
      if (
        _0x884be7[_0x4f0adf(-0xcb, -0x63, -0x96, -0x8c)](
          _0x884be7[_0x5c2db7(0x1a9, 0x1f2, 0x1aa, 0x1ae)],
          _0x5c2db7(0x1bb, 0x17e, 0x1c4, 0x17f)
        )
      ) {
        const _0x2228b9 = _0x27e26b
          ? function () {
              function _0x3f406d(_0x12c03e, _0x45e3c3, _0x3e41c0, _0x312d51) {
                return _0x5c2db7(
                  _0x3e41c0,
                  _0x45e3c3 - 0x1cf,
                  _0x3e41c0 - 0x29,
                  _0x45e3c3 - -0x184
                );
              }
              if (_0x555938) {
                const _0x22ee2d = _0x1c883b[
                  _0x3f406d(-0x1a, -0x41, -0x34, -0x17)
                ](_0xb9abb3, arguments);
                return (_0x20ef5a = null), _0x22ee2d;
              }
            }
          : function () {};
        return (_0x1fad99 = ![]), _0x2228b9;
      } else {
        if (
          _0x884be7[_0x5c2db7(0x182, 0x1ab, 0x16d, 0x18c)](
            _0x185a6c,
            _0x592e1c,
            0xcd8 + -0xf0f + 0x23f,
            [
              0x589 * 0x7 + -0xeab + -0x180d,
              0x1171 * 0x2 + -0x355 + -0x1f19,
              -0x243 * 0x7 + -0x1a10 * -0x1 + 0x1 * -0xa36,
              0x9 * 0x277 + -0x76d * -0x4 + -0x337e,
              -0xe83 + -0x3 * 0x1db + 0x1417,
              0x1b43 + 0x101d + -0x2aeb,
              -0x1a6d + -0xc50 * 0x2 + 0x330d,
              0x10bd * -0x1 + -0x1f * 0x74 + 0x1f2d,
            ]
          )
        ) {
          if (
            _0x884be7[_0x5c2db7(0x16e, 0x10b, 0x17e, 0x151)](
              _0x884be7[_0x5c2db7(0x12d, 0xf8, 0x136, 0x138)],
              _0x884be7[_0x4f0adf(-0x40, -0xf, -0x8e, -0x4c)]
            )
          ) {
            _0x5d2809 = _0x592e1c;
            break;
          } else return;
        }
      }
    }
    for (let _0x24f8db in _0x43fede[_0x5d2809]) {
      if (
        _0x884be7[_0x5c2db7(0x172, 0xfb, 0x14f, 0x13c)](
          _0x5ee714,
          0x810 + -0x19 * -0x163 + -0x2ab5,
          _0x24f8db,
          [
            -0x4a9 * 0x5 + 0x1f0e + -0xa * 0xc6,
            0xc81 * 0x1 + -0x1c45 + -0x819 * -0x2,
            -0x370 + 0x1e53 + -0x1ae3,
            -0x24c3 + 0x3c * -0x25 + 0x2dd3,
          ]
        )
      ) {
        _0x1ced78 = _0x24f8db;
        break;
      }
    }
    for (let _0x29193e in _0x43fede[_0x5d2809]) {
      if (
        _0x884be7[_0x4f0adf(-0xa5, -0x80, -0x50, -0x73)](
          _0x150fa3,
          _0x29193e,
          [
            0x1 * 0x2275 + 0x97 * 0x4 + -0x1 * 0x24ca,
            0x205c * 0x1 + 0x196d + 0x1 * -0x395b,
            0x888 + -0xf70 + -0xdd * -0x8,
            -0x8b0 + 0x1 * 0xef9 + 0x13 * -0x4f,
          ],
          -0x1050 + -0x74 * -0x2e + -0x480
        )
      ) {
        if (
          _0x884be7[_0x5c2db7(0x15d, 0x18f, 0x1b9, 0x1a1)](
            _0x884be7[_0x4f0adf(-0x82, -0x46, -0x38, -0x6d)],
            _0x884be7["mSGYI"]
          )
        )
          return ![];
        else {
          _0x452c3f = _0x29193e;
          break;
        }
      }
    }
    if (!_0x884be7[_0x5c2db7(0x1d3, 0x17c, 0x1bd, 0x19d)]("~", _0x1ced78))
      for (let _0x218b26 in _0x43fede[_0x5d2809][_0x452c3f]) {
        if (
          _0x884be7["DyPvf"](
            _0x15cbec,
            [
              -0x4 * -0x28d + 0x230e + 0x2d3b * -0x1,
              -0x1c18 * -0x1 + 0x3d6 * -0x2 + -0x1407,
              0x7c5 + -0x6 * -0xe0 + -0xd05,
              0x31b + -0x146 + 0x1 * -0x16d,
            ],
            _0x218b26,
            -0x2d3 * 0xb + 0xb1d + 0x9fe * 0x2
          )
        ) {
          if (
            _0x5c2db7(0x168, 0x1b5, 0x1a5, 0x19e) !==
            _0x884be7[_0x5c2db7(0x162, 0x1bf, 0x1dc, 0x195)]
          ) {
            _0x49cb99 = _0x218b26;
            break;
          } else
            for (
              let _0xcd39d4 = 0x2 * -0x8e7 + -0x211f * 0x1 + 0x32ed * 0x1;
              _0xcd39d4 < _0x169d06[_0x4f0adf(-0x28, -0x39, -0x56, -0x70)];
              _0xcd39d4 += -0x25b6 + -0x2535 + 0x4aed
            ) {
              if (
                _0x884be7[_0x4f0adf(-0x94, -0xbc, -0x8e, -0x82)](
                  _0x36b04f,
                  _0x35cc06[_0xcd39d4]
                ) &&
                _0x884be7["XMYrd"](
                  _0x58d21e[_0x4f0adf(-0xbc, -0xd9, -0xec, -0xa8)](_0x35ccfd),
                  _0x107a66[
                    _0x884be7[_0x4f0adf(-0xd9, -0xca, -0x92, -0x91)](
                      _0xcd39d4,
                      0x8 * 0x236 + -0x5 * -0x2e9 + 0x203c * -0x1
                    )
                  ]
                )
              )
                return ![];
            }
        }
      }
    function _0x5c2db7(_0x3aa4db, _0x2ffeae, _0xf55759, _0x474015) {
      return _0x1fa2(_0x474015 - -0xac, _0x3aa4db);
    }
    if (!_0x5d2809 || !_0x43fede[_0x5d2809]) return;
    const _0x275c54 = _0x43fede[_0x5d2809][_0x1ced78],
      _0x12e76e =
        !!_0x43fede[_0x5d2809][_0x452c3f] &&
        _0x43fede[_0x5d2809][_0x452c3f][_0x49cb99],
      _0x59fc54 = _0x884be7[_0x5c2db7(0x14f, 0x153, 0x179, 0x176)](
        _0x275c54,
        _0x12e76e
      );
    if (!_0x59fc54) return;
    let _0x11f75a = ![];
    for (
      let _0x217e85 = -0xf74 + 0x1046 + -0xe * 0xf;
      _0x884be7[_0x5c2db7(0x1ed, 0x1d7, 0x1f4, 0x1ad)](
        _0x217e85,
        _0x5a9482[_0x5c2db7(0x175, 0x179, 0x16a, 0x19f)]
      );
      _0x217e85++
    ) {
      if (
        _0x884be7[_0x4f0adf(-0xc2, -0x5a, -0x72, -0x80)](
          _0x4f0adf(-0x101, -0xc4, -0x81, -0xb9),
          _0x884be7[_0x4f0adf(-0x82, -0x8f, -0x98, -0x7f)]
        )
      ) {
        const _0x28f5de = _0x5a9482[_0x217e85],
          _0x22e375 = _0x884be7["hRitd"](
            _0x28f5de[-0x1828 + 0x49d + 0x138b],
            String[_0x5c2db7(0x1b3, 0x12c, 0x166, 0x16c) + "de"](
              0x1fe4 + 0xc16 + -0x2bcc
            )
          )
            ? _0x28f5de[_0x4f0adf(-0xb3, -0x8e, -0xe5, -0xce)](
                -0x1c84 + -0x1a28 + 0x36ad * 0x1
              )
            : _0x28f5de,
          _0x1e3df6 = _0x884be7[_0x5c2db7(0x161, 0x179, 0x14a, 0x16f)](
            _0x59fc54[_0x4f0adf(-0x59, -0xae, -0x72, -0x70)],
            _0x22e375["length"]
          ),
          _0x164b18 = _0x59fc54[_0x4f0adf(-0x5, -0x41, -0x24, -0x4e)](
            _0x22e375,
            _0x1e3df6
          ),
          _0x3898e2 =
            _0x884be7[_0x4f0adf(-0xb1, -0x53, -0xa4, -0x86)](
              _0x164b18,
              -(0x2b * 0x47 + 0x1c53 * 0x1 + -0x283f)
            ) && _0x164b18 === _0x1e3df6;
        _0x3898e2 &&
          (_0x884be7[_0x4f0adf(-0x82, -0x43, -0x3d, -0x79)](
            _0x59fc54[_0x5c2db7(0x158, 0x1af, 0x1ad, 0x19f)],
            _0x28f5de["length"]
          ) ||
            _0x884be7[_0x5c2db7(0x147, 0x140, 0x187, 0x175)](
              _0x28f5de[_0x5c2db7(0x1a0, 0x18a, 0x19f, 0x1c1)]("."),
              0xcd * -0x2f + -0x2241 + 0x1 * 0x47e4
            )) &&
          (_0x11f75a = !![]);
      } else _0x5c3941 = _0x3b2af2;
    }
    if (!_0x11f75a) {
      const _0x56eff7 = new RegExp(_0x884be7["opumo"], "g"),
        _0x4e01af = _0x884be7[_0x4f0adf(-0x5e, -0x62, -0x26, -0x60)][
          _0x5c2db7(0x199, 0x1dd, 0x1fb, 0x1b6)
        ](_0x56eff7, "");
      _0x43fede[_0x5d2809][_0x452c3f] = _0x4e01af;
    }
  });
function _0x531c() {
  const _0x457d8b = [
    "AfjPDgq",
    "swjgwui",
    "DMDmBMu",
    "yK1yq0u",
    "DMLjAfC",
    "D2fYBG",
    "u2HyC2i",
    "vxbxt24",
    "yxb2wwq",
    "w0rRCLjOrNHeEq",
    "tg9Sv2C",
    "DwrHrhLIAvL2zG",
    "B2TnsMG",
    "B1bftxy",
    "uNjgDxu",
    "kcGOlISPkYKRkq",
    "vMXYAgW",
    "AvPWtw8",
    "C2vHCMnO",
    "thjuz3i",
    "zfDQrMe",
    "CMvWBgfJzq",
    "yMLUza",
    "uhPkrLG",
    "A2HQEwe",
    "mJC2ntGYAhbrBLHK",
    "zxjYB3i",
    "DuLftgK",
    "qNzvrxq",
    "wMXTCwS",
    "svj5BeC",
    "x19WCM90B19F",
    "Aw5KzxHpzG",
    "r0POv3G",
    "uKLqqMO",
    "BM9Ytg8",
    "swPgzLK",
    "suXrCMy",
    "AfDdyuW",
    "weXytgW",
    "zMjms2m",
    "BMn0Aw9UkcKG",
    "E30Uy29UC3rYDq",
    "mZqZnZaWAvv2C0fj",
    "thnVv3O",
    "mtHqCu1zteO",
    "sxDbD0m",
    "DgfIBgu",
    "otCYmJiXmeTJqKzeCq",
    "C2XPy2u",
    "wfjqrvC",
    "yxbWBhK",
    "EK1XEgS",
    "BMPtCwi",
    "zLDgsLLACvrvrG",
    "uwDADeK",
    "qMXvyMK",
    "tgHkEvu",
    "wwL3B20",
    "vfvgt1Lgu1O",
    "wvbHuuu",
    "ue9At0G",
    "zxHJzxb0Aw9U",
    "tKPpEfa",
    "CePsCMS",
    "qw9MwgS",
    "Bg9N",
    "mZu3otC1nKLtDhHyCG",
    "y29MBvDgsLLACq",
    "DhjHy2u",
    "uxnzrw0",
    "t1DcD3K",
    "nwnbvxnZsG",
    "quzdtfu",
    "EMfIB1j1DdPAua",
    "wMP3EfP5AxPYDG",
    "wxzMwvHnrhHbvq",
    "zxHlBMe",
    "DwndEMi",
    "y09wBfO",
    "t1rOExu",
    "wezUt1i",
    "wuPqAhzQv0LJEq",
    "C1zUyNu",
    "Axnpq1y",
    "mtq3mdbyCu9lDeO",
    "y2f0AgS",
    "y2HHCKnVzgvbDa",
    "CM4GDgHPCYiPka",
    "B01LCw4",
    "txvyExa",
    "qw9ovKC",
    "zNjVBunOyxjdBW",
    "EwnTquK",
    "y29UC29Szq",
    "Ahnzwxq",
    "thLusKq",
    "mtu3nZuWmdfqzwT6Axy",
    "BM1evey",
    "BeHSsMe",
    "y29UC3rYDwn0BW",
    "y21duve",
    "rMPYDvK",
    "DwXZDwS",
    "nNrnqwnHAq",
    "y3rVCIGICMv0Dq",
    "B01st0u",
    "CM5MBem",
    "B2Dhzg0",
    "swLQrha",
    "r2rsvfm",
    "ywXluvO",
    "Aw5MBW",
    "tvjvsxy",
    "wuD2rxe",
    "AeDKrfO",
    "ovvYBLHZrG",
    "EhfOy2O",
    "zeHVwxu",
    "zLnpvK8",
    "zwnPEee",
    "r3LJDKW",
    "tKr6vum",
    "otm2otG3mNLiwvbQtG",
    "DKLXwKG",
    "DKLft1i",
    "w3PswLbAsejgCq",
    "wMDyEgW",
    "t1zvsxm",
    "wvHZtwfelNHbvq",
    "rMT0A3u",
    "yxjouM4",
    "vLHbs20",
    "y3bJyLG",
    "uMX2zvO",
    "ChjVDg90ExbL",
    "we1zCMq",
    "Dg9tDhjPBMC",
    "CMv0DxjUicHMDq",
    "B0nwq3G",
    "rhLqDMy",
    "wLbPquO",
    "z3bJvhm",
    "BgvUz3rO",
    "C3bSAxq",
  ];
  _0x531c = function () {
    return _0x457d8b;
  };
  return _0x531c();
}
function _0x1fa2(_0x1d8d4f, _0x5cb5f0) {
  const _0x408745 = _0x531c();
  return (
    (_0x1fa2 = function (_0x4b4292, _0xd43d55) {
      _0x4b4292 = _0x4b4292 - (-0xcf0 + -0x30f + -0xf1 * -0x13);
      let _0x27f813 = _0x408745[_0x4b4292];
      if (_0x1fa2["gdquPV"] === undefined) {
        var _0x1254be = function (_0x152bbf) {
          const _0x2ca1a2 =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
          let _0x5dfa90 = "",
            _0x11b436 = "",
            _0x292eb8 = _0x5dfa90 + _0x1254be;
          for (
            let _0x2add34 = 0x1 * -0x3e1 + 0xcee + -0x90d,
              _0x5e3bf7,
              _0x2d04f7,
              _0xee6b04 = -0xf71 + -0x4 * -0x680 + -0xa8f;
            (_0x2d04f7 = _0x152bbf["charAt"](_0xee6b04++));
            ~_0x2d04f7 &&
            ((_0x5e3bf7 =
              _0x2add34 % (-0x5c3 * -0x1 + -0x241 + -0x37e)
                ? _0x5e3bf7 * (0x1 * 0x2441 + -0x2496 + -0x1 * -0x95) +
                  _0x2d04f7
                : _0x2d04f7),
            _0x2add34++ % (0x107 + 0x1e75 + 0x8 * -0x3ef))
              ? (_0x5dfa90 +=
                  _0x292eb8["charCodeAt"](
                    _0xee6b04 + (-0x1b * -0x83 + 0x2433 * 0x1 + 0x18fd * -0x2)
                  ) -
                    (-0x60b * -0x6 + 0x1a8a * -0x1 + -0x9ae) !==
                  -0x2 * -0x2fe + 0x21eb + -0x27e7
                    ? String["fromCharCode"](
                        (-0xd60 + -0x5 * -0x609 + -0xfce) &
                          (_0x5e3bf7 >>
                            ((-(0x4 * -0x994 + 0x1a76 + -0x8a * -0x16) *
                              _0x2add34) &
                              (-0x26c3 + -0xb * -0x67 + 0x225c)))
                      )
                    : _0x2add34)
              : -0x8e2 * -0x2 + -0x179a + 0x5d6
          ) {
            _0x2d04f7 = _0x2ca1a2["indexOf"](_0x2d04f7);
          }
          for (
            let _0x2f8106 = 0x844 + 0x1a3d + -0x2281 * 0x1,
              _0x1f7130 = _0x5dfa90["length"];
            _0x2f8106 < _0x1f7130;
            _0x2f8106++
          ) {
            _0x11b436 +=
              "%" +
              ("00" +
                _0x5dfa90["charCodeAt"](_0x2f8106)["toString"](
                  -0xe6f + 0x19d9 * -0x1 + 0x2858
                ))["slice"](-(-0x1 * -0xacf + 0xc62 + 0x4a3 * -0x5));
          }
          return decodeURIComponent(_0x11b436);
        };
        (_0x1fa2["yqPmAd"] = _0x1254be),
          (_0x1d8d4f = arguments),
          (_0x1fa2["gdquPV"] = !![]);
      }
      const _0x59a502 = _0x408745[-0xb89 + -0x621 + 0x11aa],
        _0x3f4f57 = _0x4b4292 + _0x59a502,
        _0x5348ec = _0x1d8d4f[_0x3f4f57];
      if (!_0x5348ec) {
        const _0x27475c = function (_0x223965) {
          (this["PieHNU"] = _0x223965),
            (this["RWWzdF"] = [
              -0x10d * -0x7 + -0x185 * 0x3 + -0x2cb,
              -0x35 * 0x56 + -0x1081 * -0x2 + -0xf34,
              -0x4f * 0x74 + -0x1a70 + 0x3e3c,
            ]),
            (this["QzPaWi"] = function () {
              return "newState";
            }),
            (this["UFLPMo"] = "\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*"),
            (this["yujOxW"] = "[\x27|\x22].+[\x27|\x22];?\x20*}");
        };
        (_0x27475c["prototype"]["bdCuuu"] = function () {
          const _0x2f908c = new RegExp(this["UFLPMo"] + this["yujOxW"]),
            _0x335d7a = _0x2f908c["test"](this["QzPaWi"]["toString"]())
              ? --this["RWWzdF"][0x1d6b * 0x1 + 0x74d + -0x24b7]
              : --this["RWWzdF"][-0xf7d + 0x11f8 + -0x27b];
          return this["ZxXmJg"](_0x335d7a);
        }),
          (_0x27475c["prototype"]["ZxXmJg"] = function (_0x3aefbc) {
            if (!Boolean(~_0x3aefbc)) return _0x3aefbc;
            return this["GDeHbX"](this["PieHNU"]);
          }),
          (_0x27475c["prototype"]["GDeHbX"] = function (_0x2f9e29) {
            for (
              let _0x41eb18 = -0x139b + 0xd0a + 0x691 * 0x1,
                _0x504378 = this["RWWzdF"]["length"];
              _0x41eb18 < _0x504378;
              _0x41eb18++
            ) {
              this["RWWzdF"]["push"](Math["round"](Math["random"]())),
                (_0x504378 = this["RWWzdF"]["length"]);
            }
            return _0x2f9e29(
              this["RWWzdF"][-0x2c * -0x88 + 0x26ec + 0x4 * -0xf93]
            );
          }),
          new _0x27475c(_0x1fa2)["bdCuuu"](),
          (_0x27f813 = _0x1fa2["yqPmAd"](_0x27f813)),
          (_0x1d8d4f[_0x3f4f57] = _0x27f813);
      } else _0x27f813 = _0x5348ec;
      return _0x27f813;
    }),
    _0x1fa2(_0x1d8d4f, _0x5cb5f0)
  );
}
_0x3f7873();
const _0x34f2af = (function () {
    const _0x982bc1 = {};
    (_0x982bc1[_0x1d429a(0xa8, 0x77, 0x62, 0x64)] = function (
      _0x409abd,
      _0x58dcd4
    ) {
      return _0x409abd + _0x58dcd4;
    }),
      (_0x982bc1[_0x1d429a(0x98, 0x7c, 0xaf, 0x52)] =
        _0x1d429a(0x80, 0xc0, 0xc3, 0x7d) +
        _0x536589(-0xf0, -0x70, -0xad, -0xbd)),
      (_0x982bc1[_0x536589(0x11, -0xd, -0x27, -0x49)] = function (
        _0x34c360,
        _0x5f52ee
      ) {
        return _0x34c360 === _0x5f52ee;
      }),
      (_0x982bc1[_0x1d429a(0x53, 0x4d, 0x6b, 0x75)] = _0x1d429a(
        0x9e,
        0xd2,
        0x7d,
        0xd1
      ));
    const _0xb6e165 = _0x982bc1;
    function _0x536589(_0x1ab3da, _0x50e87e, _0x47ea10, _0x3092c5) {
      return _0x1fa2(_0x47ea10 - -0x292, _0x50e87e);
    }
    let _0x262f03 = !![];
    function _0x1d429a(_0x4e4bed, _0x2c2311, _0x452523, _0x1591f9) {
      return _0x1fa2(_0x4e4bed - -0x1c6, _0x2c2311);
    }
    return function (_0x69dee, _0x7ba509) {
      function _0xb5789(_0x5ad555, _0x4f1925, _0x2adc92, _0x555233) {
        return _0x536589(
          _0x5ad555 - 0x1db,
          _0x4f1925,
          _0x2adc92 - 0x469,
          _0x555233 - 0x5e
        );
      }
      const _0x55d63e = {
          IjFfY: function (_0xbf1e43, _0x5bc9a2) {
            function _0x3c0f0f(_0xa839d0, _0x575c48, _0x4bb693, _0x3c4a3d) {
              return _0x1fa2(_0x3c4a3d - -0x2e1, _0x4bb693);
            }
            return _0xb6e165[_0x3c0f0f(-0xab, -0x42, -0x6d, -0x73)](
              _0xbf1e43,
              _0x5bc9a2
            );
          },
          LhJyU: _0xb6e165[_0xb5789(0x3f4, 0x454, 0x435, 0x42f)],
          cOVlZ: function (_0x207496, _0x1b2b75) {
            return _0xb6e165["IRylG"](_0x207496, _0x1b2b75);
          },
          exKna: _0xb6e165[_0x50ba13(0x386, 0x384, 0x360, 0x39a)],
          maRLq: _0xb5789(0x3d7, 0x435, 0x3f3, 0x3e1),
        },
        _0x270a39 = _0x262f03
          ? function () {
              function _0x383be9(_0x4186af, _0x4f7bac, _0x405f5b, _0x3ccad1) {
                return _0x50ba13(
                  _0x4186af - 0xed,
                  _0x3ccad1,
                  _0x405f5b - 0x166,
                  _0x405f5b - -0x55b
                );
              }
              function _0x4ec304(_0x3c371e, _0x6c1cbc, _0x591cdf, _0x959d0c) {
                return _0xb5789(
                  _0x3c371e - 0xae,
                  _0x959d0c,
                  _0x3c371e - 0x18a,
                  _0x959d0c - 0x14c
                );
              }
              if (
                _0x55d63e[_0x4ec304(0x56c, 0x544, 0x544, 0x5b1)](
                  _0x55d63e[_0x4ec304(0x56a, 0x547, 0x580, 0x54b)],
                  _0x55d63e[_0x383be9(-0x1b9, -0x1c8, -0x1d1, -0x1c7)]
                )
              ) {
                if (_0x7ba509) {
                  if (
                    _0x55d63e[_0x4ec304(0x56c, 0x5a8, 0x55f, 0x58e)](
                      _0x55d63e["maRLq"],
                      "LyTJD"
                    )
                  ) {
                    const _0x24f944 = _0x7ba509[
                      _0x4ec304(0x550, 0x53b, 0x567, 0x52e)
                    ](_0x69dee, arguments);
                    return (_0x7ba509 = null), _0x24f944;
                  } else
                    _0x3232b0 = _0x29ebc5(
                      _0x55d63e[_0x4ec304(0x5d2, 0x5d6, 0x5c4, 0x5ab)](
                        _0x55d63e[_0x4ec304(0x556, 0x520, 0x59a, 0x530)] +
                          (_0x4ec304(0x547, 0x519, 0x507, 0x512) +
                            "ctor(\x22retu" +
                            _0x383be9(-0x1e0, -0x1aa, -0x1c6, -0x1c8) +
                            "\x20)"),
                        ");"
                      )
                    )();
                }
              } else {
                const _0x524619 = _0x4f3d39
                  ? function () {
                      function _0xf62ff3(
                        _0x4a057e,
                        _0x4daed7,
                        _0x523d10,
                        _0x1bf296
                      ) {
                        return _0x383be9(
                          _0x4a057e - 0x15c,
                          _0x4daed7 - 0x12a,
                          _0x4a057e - 0x393,
                          _0x1bf296
                        );
                      }
                      if (_0x2259f9) {
                        const _0x1e0c9a = _0x53a846[
                          _0xf62ff3(0x1a8, 0x1ae, 0x198, 0x17c)
                        ](_0x4f1086, arguments);
                        return (_0x2de553 = null), _0x1e0c9a;
                      }
                    }
                  : function () {};
                return (_0x5ad9ea = ![]), _0x524619;
              }
            }
          : function () {};
      function _0x50ba13(_0x1c904d, _0x5a56da, _0x14d231, _0x8f4929) {
        return _0x1d429a(
          _0x8f4929 - 0x347,
          _0x5a56da,
          _0x14d231 - 0x197,
          _0x8f4929 - 0x3e
        );
      }
      return (_0x262f03 = ![]), _0x270a39;
    };
  })(),
  _0x29193b = _0x34f2af(this, function () {
    const _0x7af1f = {
      NJOxP: function (_0x392fac, _0x592035, _0x1018fd, _0x305385) {
        return _0x392fac(_0x592035, _0x1018fd, _0x305385);
      },
      xeAjS: _0x55d033(0x4bb, 0x474, 0x4e8, 0x495) + "+$",
      UpWOn: _0x55d033(0x49d, 0x470, 0x45e, 0x476),
      viIhW: _0x16cd5f(-0x150, -0xe6, -0x109, -0x125),
      norLo: function (_0xbe81d1, _0x32e73f) {
        return _0xbe81d1(_0x32e73f);
      },
      dWjFa: _0x55d033(0x4a5, 0x4dd, 0x4e5, 0x4c2) + "nction()\x20",
      IwAwC: function (_0x516bbd) {
        return _0x516bbd();
      },
      jhssZ: "info",
      XLXLl: _0x55d033(0x4c6, 0x4bf, 0x486, 0x4ea),
      RTydI: _0x16cd5f(-0x154, -0xf3, -0x12a, -0x12e),
      ecixA: _0x16cd5f(-0x13c, -0x167, -0x15b, -0x13d),
      rnflC: function (_0x1429ef, _0x33bd0a) {
        return _0x1429ef < _0x33bd0a;
      },
      POZOH: function (_0x393c02, _0x72120b) {
        return _0x393c02 === _0x72120b;
      },
      AFCLU: _0x16cd5f(-0x139, -0x158, -0x163, -0x11e),
      YGvEq: _0x55d033(0x4af, 0x4dd, 0x466, 0x495),
    };
    let _0x53a50f;
    try {
      if (
        _0x7af1f[_0x55d033(0x4b3, 0x4f9, 0x4f5, 0x47c)] ===
        _0x7af1f[_0x16cd5f(-0x11c, -0xb9, -0x101, -0xd7)]
      )
        return _0x7af1f[_0x16cd5f(-0x147, -0x143, -0x10e, -0x12d)](
          _0x5eea75,
          _0x263496,
          _0x14fd0f,
          _0x2c60cf
        );
      else {
        const _0x31e052 = _0x7af1f[_0x55d033(0x4cf, 0x4c5, 0x509, 0x4a7)](
          Function,
          _0x7af1f[_0x55d033(0x4c0, 0x4e3, 0x4e2, 0x4ce)] +
            (_0x55d033(0x445, 0x463, 0x3fe, 0x465) +
              _0x55d033(0x484, 0x4ca, 0x454, 0x44d) +
              "rn\x20this\x22)(" +
              "\x20)") +
            ");"
        );
        _0x53a50f =
          _0x7af1f[_0x16cd5f(-0x13e, -0x120, -0x148, -0x13e)](_0x31e052);
      }
    } catch (_0x496673) {
      _0x53a50f = window;
    }
    const _0x21b3b6 = (_0x53a50f["console"] =
      _0x53a50f[_0x16cd5f(-0x11f, -0xe8, -0xd8, -0x10e)] || {});
    function _0x55d033(_0x393e56, _0x5394a8, _0x2133b0, _0x594532) {
      return _0x1fa2(_0x393e56 - 0x25f, _0x2133b0);
    }
    function _0x16cd5f(_0x2e2c76, _0x48743e, _0x3adc23, _0x2c0571) {
      return _0x1fa2(_0x2c0571 - -0x328, _0x3adc23);
    }
    const _0x56eb02 = [
      _0x16cd5f(-0x133, -0x15b, -0x16b, -0x12a),
      _0x55d033(0x4b1, 0x4d1, 0x46f, 0x4bd),
      _0x7af1f["jhssZ"],
      _0x7af1f[_0x55d033(0x4d3, 0x48f, 0x4ee, 0x4ff)],
      _0x7af1f["RTydI"],
      _0x7af1f[_0x16cd5f(-0xf3, -0xf3, -0x115, -0xf4)],
      _0x16cd5f(-0x16e, -0xef, -0x125, -0x127),
    ];
    for (
      let _0x5da0ee = -0x794 + -0x1697 + 0x1 * 0x1e2b;
      _0x7af1f[_0x55d033(0x486, 0x4b8, 0x443, 0x49a)](
        _0x5da0ee,
        _0x56eb02[_0x55d033(0x4aa, 0x4df, 0x47d, 0x477)]
      );
      _0x5da0ee++
    ) {
      if (
        _0x7af1f[_0x16cd5f(-0x11d, -0x13a, -0x120, -0x12f)](
          _0x7af1f[_0x55d033(0x464, 0x41f, 0x49f, 0x49a)],
          _0x7af1f[_0x16cd5f(-0xf2, -0xc4, -0xfc, -0xfa)]
        )
      )
        return _0x18bdb0[_0x55d033(0x4a4, 0x4a8, 0x4a1, 0x4e0)]()
          [_0x16cd5f(-0xb8, -0xe3, -0x9f, -0xc9)](_0x7af1f["xeAjS"])
          [_0x16cd5f(-0x12b, -0xdb, -0xed, -0xe3)]()
          [_0x16cd5f(-0xc5, -0x102, -0x126, -0x108) + "r"](_0xbecb7a)
          [_0x16cd5f(-0xa8, -0xa9, -0xd7, -0xc9)](
            _0x16cd5f(-0xe0, -0xa0, -0x8d, -0xcc) + "+$"
          );
      else {
        const _0x1153f0 =
            _0x34f2af["constructo" + "r"][
              _0x55d033(0x4a2, 0x481, 0x49b, 0x4c0)
            ][_0x16cd5f(-0xc1, -0xcd, -0xb5, -0xc5)](_0x34f2af),
          _0x2197d2 = _0x56eb02[_0x5da0ee],
          _0x49a0b6 = _0x21b3b6[_0x2197d2] || _0x1153f0;
        (_0x1153f0[_0x16cd5f(-0xba, -0x102, -0xdc, -0xbc)] =
          _0x34f2af["bind"](_0x34f2af)),
          (_0x1153f0[_0x55d033(0x4a4, 0x496, 0x4df, 0x499)] =
            _0x49a0b6[_0x16cd5f(-0xf9, -0x116, -0x12a, -0xe3)]["bind"](
              _0x49a0b6
            )),
          (_0x21b3b6[_0x2197d2] = _0x1153f0);
      }
    }
  });
_0x29193b();
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  increment,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const app = initializeApp(firebaseConfig),
  auth = getAuth(app),
  db = getFirestore(app);

/* #region Home: Status Display */
// BAGIAN 2: DATA DAN VARIABEL GLOBAL
// ====================================
// Variabel untuk menyimpan data pengguna yang aktif secara lokal
let localUserData = {};

// Referensi Elemen DOM
const missionListContainer = document.getElementById("mission_list");
const popup = document.getElementById("success-popup");
const popupMessage = document.getElementById("popup-message");
const closePopupButton = document.getElementById("close-popup");

// --- FUNGSI TAMPILAN (UI) ---
const updatePerformanceDisplay = () => {
  const levelElement = document.querySelector(
    "#performa_display span.text-\\[20px\\]"
  );
  const progressBars = document.querySelectorAll("#performa_display progress");
  if (!levelElement || progressBars.length < 3) return;

  levelElement.textContent = `LV. ${localUserData.level ?? 0}`;
  progressBars[0].value = localUserData.streak ?? 0;
  progressBars[1].value = localUserData.fisik ?? 0;
  progressBars[2].value = localUserData.mental ?? 0;
};

const updatePointsDisplay = () => {
  const pointsContainer = document.querySelector("#harapan_display .flex-row");
  if (pointsContainer && pointsContainer.childNodes.length > 2) {
    pointsContainer.childNodes[2].nodeValue = ` ${localUserData.poin ?? 0} `;
  }
};

const showCompletionPopup = (mission) => {
  if (!popup || !popupMessage) return;
  popupMessage.textContent = `Selamat! Anda menyelesaikan "${mission.name}" dan mendapatkan +${mission.points} Poin & +${mission.rewards.xp} XP.`;
  popup.classList.remove("hidden");
};

const hideCompletionPopup = () => {
  if (popup) popup.classList.add("hidden");
};

// --- LOGIKA INTI (SINKRONISASI & PEMBUATAN ELEMEN) ---

// Fungsi untuk menangani reset harian dan mengambil misi aktif
const handleDailyTasksAndFetchMissions = async (userId, userData) => {
  const date = new Date();
  const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
  const lastLoginDate = userData.lastLoginDate;

  if (lastLoginDate !== today) {
    console.log("Hari baru terdeteksi, mereset statistik harian...");
    const userDocRef = doc(db, "users", userId);
    try {
      await updateDoc(userDocRef, {
        completedMissionsToday: [],
        streak: 0,
        lastLoginDate: today,
      });
      // Perbarui data lokal setelah reset berhasil
      localUserData.completedMissionsToday = [];
      localUserData.streak = 0;
      localUserData.lastLoginDate = today;
    } catch (error) {
      console.error("Gagal mereset data harian:", error);
    }
  }

  const dailyMissionsDocRef = doc(db, "daily_missions", today);
  const dailyMissionsSnap = await getDoc(dailyMissionsDocRef);

  if (!dailyMissionsSnap.exists()) {
    console.error(
      `Dokumen misi harian TIDAK ditemukan untuk tanggal ${today}.`
    );
    return [];
  }

  const missionIds = dailyMissionsSnap.data().missionIds;
  if (!missionIds || missionIds.length === 0) {
    console.warn(
      `Field 'missionIds' kosong atau tidak ada di dokumen ${today}.`
    );
    return [];
  }

  console.log("ID Misi yang akan diambil:", missionIds);
  const missionPromises = missionIds.map((id) =>
    getDoc(doc(db, "missions", id))
  );
  const missionDocs = await Promise.all(missionPromises);

  const activeMissions = missionDocs
    .map((docSnap) => (docSnap.exists() ? docSnap.data() : null))
    .filter(Boolean);
  console.log("Data misi aktif:", activeMissions);
  return activeMissions;
};

// Fungsi untuk sinkronisasi hadiah misi ke Firestore
const processMissionRewards = async (userId, mission) => {
  const userDocRef = doc(db, "users", userId);
  const rewards = mission.rewards;

  const updates = {
    poin: increment(mission.points || 0),
    xp: increment(rewards.xp || 0),
    streak: increment(rewards.streak || 0),
    fisik: increment(rewards.fisik || 0),
    mental: increment(rewards.mental || 0),
    completedMissionsToday: arrayUnion(mission.id),
  };

  let newLevel = localUserData.level ?? 0;
  let newXp = (localUserData.xp ?? 0) + (rewards.xp || 0);
  let newXpForNextLevel = localUserData.xpForNextLevel || 100;

  if (newXp >= newXpForNextLevel) {
    newLevel++;
    newXp -= newXpForNextLevel;
    newXpForNextLevel = Math.floor(newXpForNextLevel * 1.5);
    updates.level = newLevel;
    updates.xp = newXp;
    updates.xpForNextLevel = newXpForNextLevel;
    setTimeout(() => alert(`🎉 Selamat! Anda naik ke Level ${newLevel}!`), 500);
  }

  try {
    await updateDoc(userDocRef, updates);
    console.log("Statistik berhasil disinkronkan ke Firestore.");

    // Cukup ambil data terbaru dari server untuk memastikan konsistensi
    const updatedDoc = await getDoc(userDocRef);
    if (updatedDoc.exists()) {
      localUserData = updatedDoc.data(); // Perbarui data lokal dengan data server
    }
    return true;
  } catch (error) {
    console.error("Gagal sinkronisasi statistik:", error);
    return false;
  }
};

const createMissionElement = (mission, allMissions) => {
  const missionWrapper = document.createElement("div");
  const missionDiv = document.createElement("div");
  const isCompleted =
    localUserData.completedMissionsToday?.includes(mission.id) || false;

  const baseClasses =
    "mission-item flex flex-col gap-2.5 p-5 bg-white rounded-xl shadow-sm";
  const statusClasses = isCompleted
    ? "text-gray-400 line-through cursor-not-allowed opacity-60"
    : "cursor-pointer hover:shadow-md transition";
  missionDiv.className = `${baseClasses} ${statusClasses}`;

  missionDiv.innerHTML = `
        <div class="flex justify-between items-center">
            <span class="text-[16px] font-medium">${mission.name}</span>
            <span class="font-bold text-[13px] ${
              isCompleted ? "text-gray-400" : "text-amber-600"
            }">+${mission.points} Poin</span>
        </div>`;

  if (!isCompleted) {
    const actionButtonsDiv = document.createElement("div");
    actionButtonsDiv.className =
      "action-buttons flex justify-end space-x-2 text-[12px]";
    actionButtonsDiv.style.display = "none";
    actionButtonsDiv.innerHTML = `<button data-action="finish" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Selesai</button>`;
    missionDiv.appendChild(actionButtonsDiv);

    const finishButton = actionButtonsDiv.querySelector(
      '[data-action="finish"]'
    );
    finishButton.addEventListener("click", async (e) => {
      e.stopPropagation();
      finishButton.disabled = true;
      finishButton.textContent = "Memproses...";
      const success = await processMissionRewards(
        auth.currentUser.uid,
        mission
      );
      if (success) {
        showCompletionPopup(mission);
        updatePerformanceDisplay();
        updatePointsDisplay();
        renderAllMissions(allMissions); // Render ulang dengan daftar misi yang sama
      } else {
        alert("Gagal menyelesaikan misi. Coba lagi.");
        finishButton.disabled = false;
        finishButton.textContent = "Selesai";
      }
    });

    missionDiv.addEventListener("click", () => {
      const isVisible = actionButtonsDiv.style.display === "flex";
      document
        .querySelectorAll(".action-buttons")
        .forEach((btn) => (btn.style.display = "none"));
      actionButtonsDiv.style.display = isVisible ? "none" : "flex";
    });
  }

  missionWrapper.appendChild(missionDiv);
  return missionWrapper;
};

// --- FUNGSI RENDER UTAMA (Dipanggil dari onAuthStateChanged) ---
const renderAllMissions = (missionsToRender) => {
  if (!missionListContainer) return;
  missionListContainer.innerHTML = "";

  if (!missionsToRender || missionsToRender.length === 0) {
    missionListContainer.innerHTML =
      '<p class="text-center text-gray-500">Tidak ada misi hari ini. Cek lagi besok!</p>';
    return;
  }

  missionsToRender
    .sort((a, b) => {
      const aCompleted = localUserData.completedMissionsToday?.includes(a.id);
      const bCompleted = localUserData.completedMissionsToday?.includes(b.id);
      return aCompleted - bCompleted;
    })
    .forEach((mission) => {
      const missionElement = createMissionElement(mission, missionsToRender); // Kirim daftar misi
      missionListContainer.appendChild(missionElement);
    });
};

// BAGIAN 5: TITIK MASUK UTAMA APLIKASI (ENTRY POINT)
// ====================================================
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Pengguna login:", user.uid);
    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      localUserData = docSnap.data(); // Simpan data ke variabel global
      console.log("Data pengguna:", localUserData);
      const activeMissions = await handleDailyTasksAndFetchMissions(
        user.uid,
        localUserData
      );

      // Panggil semua fungsi update/render setelah data siap
      updatePerformanceDisplay();
      updatePointsDisplay();
      renderAllMissions(activeMissions);
      updateProfilePage();
      updateAvatarDisplay(); // <-- PANGGIL DI SINI
      initializeAvatarEditor();
      generateLeaderboard();
    } else {
      console.error("Data pengguna tidak ditemukan di Firestore!");
      window.location.href = "./other-features/login-page.html"; // Redirect jika data tidak ada
    }
  } else {
    console.log(
      "Tidak ada pengguna yang login. Mengarahkan ke halaman login..."
    );
    window.location.href = "./other-features/login-page.html"; // Redirect jika tidak login
  }
});

// Event listener untuk tombol popup
if (closePopupButton)
  closePopupButton.addEventListener("click", hideCompletionPopup);

// --- Fungsi untuk memperbarui tampilan Halaman Profil ---
const updateProfilePage = () => {
  // Referensi ke elemen-elemen di halaman profil
  const nameElement = document.getElementById("name");
  const poinElement = document.getElementById("profile_poin_display");
  const emailElement = document.getElementById("email");
  const genderIconElement = document.getElementById("gender_icon");
  const genderElement = document.getElementById("gender");
  const ageElement = document.getElementById("age");

  // Pastikan semua elemen ada sebelum melanjutkan
  if (
    !nameElement ||
    !poinElement ||
    !emailElement ||
    !genderIconElement ||
    !genderElement ||
    !ageElement
  ) {
    return;
  }

  // Isi elemen dengan data dari `localUserData`
  nameElement.textContent = localUserData.name || "Nama Pengguna";
  poinElement.textContent = `${localUserData.poin || 0} Poin`;
  emailElement.textContent = localUserData.email || "";
  genderElement.textContent = localUserData.gender || "Belum diatur";

  // Tampilkan ikon yang sesuai berdasarkan jenis kelamin
  if (localUserData.gender === "Laki-laki") {
    genderIconElement.innerHTML = `<div class="svg w-6 h-6 bg-(image:--male) bg-contain bg-center bg-no-repeat"></div>`;
  } else if (localUserData.gender === "Perempuan") {
    genderIconElement.innerHTML = `<div class="svg w-6 h-6 bg-(image:--female) bg-contain bg-center bg-no-repeat"></div>`;
  } else {
    genderIconElement.innerHTML = ""; // Kosongkan jika tidak ada data
  }

  // --- LOGIKA BARU UNTUK USIA ---
  if (localUserData.tanggalLahir) {
    const birthDate = new Date(localUserData.tanggalLahir);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    ageElement.textContent = `${age} Tahun`;
  } else {
    ageElement.textContent = "Usia belum diatur";
  }
};

// --- LOGIKA LOGOUT ---
const logoutButton = document.getElementById("btn_logout");

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        // Logout berhasil.
        console.log("Pengguna berhasil logout.");
        // Arahkan kembali ke halaman login.
        window.location.href = "./other-features/login-page.html";
      })
      .catch((error) => {
        // Terjadi error saat logout.
        console.error("Gagal logout:", error);
        alert("Gagal untuk logout, silakan coba lagi.");
      });
  });
}

/* #endregion */

/* #region Avatar Selection */
// --- LOGIKA EDITOR AVATAR ---

// Referensi Elemen DOM untuk Avatar
const homeAvatarContainer = document.getElementById("homeAvatar");
const mainAvatarContainer = document.querySelector(".d-avatar > div");
// const editAvatarTrigger = document.querySelector(".d-avatar");
const editAvatarTrigger = document.querySelector("#edit-avatar");
const avatarPopup = document.getElementById("avatar-popup");
const googlePhotoChoice = document.getElementById("google-photo-choice");
const defaultAvatarsGrid = document.getElementById("default-avatars-grid");
const saveAvatarButton = document.getElementById("save-avatar-change");
const cancelAvatarButton = document.getElementById("cancel-avatar-change");

// Variabel untuk menyimpan pilihan sementara
let selectedAvatarValue = null;

// Fungsi untuk menampilkan avatar utama pengguna
const updateAvatarDisplay = () => {
  if (!mainAvatarContainer || !localUserData.avatar) return;

  const avatar = localUserData.avatar;
  // Hapus style lama
  mainAvatarContainer.style.backgroundImage = "";
  homeAvatarContainer.style.backgroundImage = "";
  mainAvatarContainer.className =
    "img-src ring-amber-600 ring-offset-base-200 w-30 rounded-full ring-4 ring-offset-4 bg-center bg-cover bg-no-repeat";
  homeAvatarContainer.className =
    "img-src w-[50px] h-[50px] bg-contain bg-center bg-no-repeat rounded-full";
  if (avatar.startsWith("http")) {
    // Jika avatar adalah URL dari Google
    mainAvatarContainer.style.backgroundImage = `url(${avatar})`;
    homeAvatarContainer.style.backgroundImage = `url(${avatar})`;
  } else if (avatar.startsWith("--ava")) {
    // Jika avatar adalah variabel CSS
    mainAvatarContainer.classList.add(`bg-(image:${avatar})`);
  }
};

// Fungsi untuk membuka popup
const openAvatarPopup = () => {
  if (!auth.currentUser) return;

  // 1. Set nilai terpilih saat ini
  selectedAvatarValue = localUserData.avatar || auth.currentUser.photoURL;

  // 2. Tampilkan pratinjau foto Google
  googlePhotoChoice.innerHTML = `<img src="${auth.currentUser.photoURL}" class="w-16 h-16 rounded-full">`;

  // 3. Tampilkan pratinjau avatar default
  defaultAvatarsGrid.innerHTML = ""; // Kosongkan dulu
  ["--ava-1", "--ava-2", "--ava-3", "--ava-4", "--ava-5"].forEach((avaVar) => {
    const div = document.createElement("div");
    div.className =
      "img-src avatar-choice w-16 h-16 rounded-full cursor-pointer bg-cover bg-center";
    div.classList.add(`bg-(image:${avaVar})`);
    div.dataset.value = avaVar; // Simpan nilai di data-attribute
    defaultAvatarsGrid.appendChild(div);
  });

  // 4. Update tampilan visual pilihan
  updateSelectionVisual();

  // 5. Tampilkan popup
  avatarPopup.classList.remove("hidden");
};

// Fungsi untuk menutup popup
const closeAvatarPopup = () => avatarPopup.classList.add("hidden");

// Fungsi untuk update cincin/ring seleksi
const updateSelectionVisual = () => {
  document.querySelectorAll(".avatar-choice").forEach((el) => {
    // Hapus seleksi dari semua
    el.classList.remove("selected");
    // Tambahkan seleksi ke yang cocok
    if (
      el.dataset.value === selectedAvatarValue ||
      (el.id === "google-photo-choice" &&
        selectedAvatarValue.startsWith("http"))
    ) {
      el.classList.add("selected");
    }
  });
};

// Inisialisasi semua event listener untuk editor avatar
const initializeAvatarEditor = () => {
  if (!editAvatarTrigger) return;

  // Buka popup saat avatar utama diklik
  editAvatarTrigger.addEventListener("click", openAvatarPopup);

  // Tutup popup saat tombol batal diklik
  cancelAvatarButton.addEventListener("click", closeAvatarPopup);

  // Event listener untuk pilihan foto Google
  googlePhotoChoice.addEventListener("click", () => {
    selectedAvatarValue = auth.currentUser.photoURL;
    updateSelectionVisual();
  });

  // Event listener untuk pilihan avatar default (menggunakan event delegation)
  defaultAvatarsGrid.addEventListener("click", (e) => {
    if (e.target.matches(".avatar-choice")) {
      selectedAvatarValue = e.target.dataset.value;
      updateSelectionVisual();
    }
  });

  // Event listener untuk tombol simpan
  saveAvatarButton.addEventListener("click", async () => {
    if (!selectedAvatarValue) return;

    saveAvatarButton.textContent = "Menyimpan...";
    saveAvatarButton.disabled = true;

    const userDocRef = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(userDocRef, {
        avatar: selectedAvatarValue,
      });
      // Update data lokal & tampilan
      localUserData.avatar = selectedAvatarValue;
      updateAvatarDisplay();
      closeAvatarPopup();
    } catch (error) {
      console.error("Gagal menyimpan avatar:", error);
      alert("Gagal menyimpan perubahan.");
    } finally {
      saveAvatarButton.textContent = "Simpan";
      saveAvatarButton.disabled = false;
    }
  });
};
/* #endregion */

/* #region Profile Customization */
const profileFormContainer = document.getElementById("profile-form-container");
const profileForm = document.getElementById("profile-form");
const editProfileButton = document.getElementById("edit-profile-button");
const cancelEditButton = document.getElementById("cancel-edit-button");
const inputName = document.getElementById("input-name");
const inputGender = document.getElementById("input-gender");
const inputDob = document.getElementById("input-dob");

const showProfileForm = () => {
  if (!profileFormContainer) return;

  // Isi form dengan data pengguna saat ini
  inputName.value = localUserData.name || "";
  inputGender.value = localUserData.gender || "";
  inputDob.value = localUserData.tanggalLahir || "";

  profileFormContainer.classList.remove("hidden");
};

const hideProfileForm = () => {
  if (profileFormContainer) profileFormContainer.classList.add("hidden");
};

const handleSaveProfile = async (event) => {
  event.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const updatedData = {
    name: inputName.value,
    gender: inputGender.value,
    tanggalLahir: inputDob.value,
  };

  if (!updatedData.name || !updatedData.gender || !updatedData.tanggalLahir) {
    alert("Harap lengkapi semua data.");
    return;
  }

  const saveButton = profileForm.querySelector('button[type="submit"]');
  saveButton.textContent = "Menyimpan...";
  saveButton.disabled = true;

  try {
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, updatedData);

    // Update data lokal dan segarkan UI
    localUserData = { ...localUserData, ...updatedData };
    updateProfilePage();

    hideProfileForm();
    alert("Profil berhasil diperbarui!");
  } catch (error) {
    console.error("Gagal memperbarui profil:", error);
    alert("Gagal menyimpan perubahan.");
  } finally {
    saveButton.textContent = "Simpan";
    saveButton.disabled = false;
  }
};

// --- Inisialisasi Event Listener untuk Form ---
if (editProfileButton)
  editProfileButton.addEventListener("click", showProfileForm);
if (cancelEditButton)
  cancelEditButton.addEventListener("click", hideProfileForm);
if (profileForm) profileForm.addEventListener("submit", handleSaveProfile);
/* #endregion */

/* #region Home Banner */
// ⚙️ PENGATURAN CAROUSEL
const bannerImages = [
  "https://placehold.co/600x300/FFF/000?text=Banner+1",
  "https://placehold.co/600x300/FFF/000?text=Banner+2",
  "https://placehold.co/600x300/FFF/000?text=Banner+3",
  "https://placehold.co/600x300/FFF/000?text=Banner+4",
];

// Ambil elemen dari DOM
const slidesContainer = document.getElementById("slides_container");
const dotsContainer = document.getElementById("dots_container");

let currentIndex = 0;
let slideInterval;

// Fungsi utama untuk pindah slide dan update dot
const showSlide = (index) => {
  // Pindahkan kontainer slide
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;

  // Update kelas aktif pada dot indikator
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-gray-800", i === index);
    dot.classList.toggle("bg-gray-300", i !== index);
  });

  currentIndex = index;
};

// Fungsi untuk memulai autoplay
const startAutoplay = () => {
  slideInterval = setInterval(() => {
    const nextIndex = (currentIndex + 1) % bannerImages.length;
    showSlide(nextIndex);
  }, 4000); // Bergerak setiap 4 detik
};

// Inisialisasi Carousel
const initCarousel = () => {
  // Buat elemen slide dari array bannerImages
  bannerImages.forEach((src) => {
    const slide = document.createElement("div");
    slide.className = "w-full h-full flex-shrink-0";
    slide.innerHTML = `<img src="${src}" class="w-full h-full object-cover" alt="Banner Image">`;
    slidesContainer.appendChild(slide);
  });

  // Buat elemen dot indikator
  bannerImages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className =
      "carousel-dot w-2.5 h-2.5 rounded-full transition-colors duration-300";
    dot.addEventListener("click", () => {
      showSlide(index);
      // Reset autoplay saat dot diklik
      clearInterval(slideInterval);
      startAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  // Tampilkan slide pertama dan mulai autoplay
  showSlide(0);
  startAutoplay();
};

initCarousel();
/* #endregion */

/* #region Navigation Logics */
// Ambil semua elemen navigasi
const navButtons = document.querySelectorAll(".bnav");
const backBtn = document.getElementById("btn_back");
const contentPages = document.querySelectorAll(".page_content");
const homepage = document.getElementById("homepage"); // ID untuk halaman utama Anda

/**
 * Fungsi terpusat untuk menangani semua navigasi halaman.
 * @param {string} pageId - ID dari elemen halaman yang ingin ditampilkan.
 */

function navigateTo(pageId) {
  // 1. Sembunyikan semua halaman terlebih dahulu
  contentPages.forEach((page) => {
    page.classList.add("hidden");
  });

  // 2. Tampilkan halaman yang dituju
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.remove("hidden");
  }

  // 3. Perbarui status aktif tombol navigasi bawah
  navButtons.forEach((btn) => {
    const buttonIcon = btn.querySelector(".bnav_icon");
    // Cek apakah tombol ini adalah tombol untuk halaman yang sedang aktif
    if (btn.dataset.target === pageId) {
      // Terapkan style aktif
      btn.classList.add("text-amber-600");
      btn.classList.remove("text-gray-600");
      if (buttonIcon) {
        buttonIcon.classList.add("bg-amber-600");
        buttonIcon.classList.remove("bg-gray-600");
      }
    } else {
      // Terapkan style non-aktif
      btn.classList.remove("text-amber-600");
      btn.classList.add("text-gray-600");
      if (buttonIcon) {
        buttonIcon.classList.remove("bg-amber-600");
        buttonIcon.classList.add("bg-gray-600");
      }
    }
  });
}

// Pasang event listener untuk semua tombol navigasi utama
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    navigateTo(targetId);

    // Scroll ke atas setiap kali pindah halaman
    window.scrollTo(0, 0);
  });
});

// Pasang event listener untuk tombol kembali
if (backBtn) {
  backBtn.addEventListener("click", () => {
    navigateTo("homepage"); // Langsung panggil fungsi navigasi ke homepage
  });
}
/* #endregion */

/* #region Leaderboard Display */
const generateLeaderboard = async () => {
  const leaderboardContainer = document.getElementById("leaderboard_section");
  if (!leaderboardContainer) return;

  // Tampilkan pesan memuat
  leaderboardContainer.innerHTML =
    '<p class="text-center text-gray-500">Memuat peringkat...</p>';

  try {
    // 1. Buat query untuk mengambil semua user, diurutkan berdasarkan 'poin' secara menurun
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("poin", "desc"));

    // 2. Eksekusi query
    const querySnapshot = await getDocs(q);

    // Kosongkan kontainer sebelum mengisi dengan data baru
    leaderboardContainer.innerHTML = "";
    let rank = 1;

    // 3. Ulangi setiap dokumen hasil query untuk membuat baris peringkat
    querySnapshot.forEach((docSnap) => {
      const player = docSnap.data();

      // Tentukan style berdasarkan peringkat (sama seperti sebelumnya)
      let rankColor, medal, bgColor;
      switch (rank) {
        case 1:
          rankColor = "bg-orange-400";
          medal = "🥇";
          bgColor = "bg-amber-100";
          break;
        case 2:
          rankColor = "bg-gray-400";
          medal = "🥈";
          bgColor = "bg-indigo-100";
          break;
        case 3:
          rankColor = "bg-amber-600";
          medal = "🥉";
          bgColor = "bg-orange-200";
          break;
        default:
          rankColor = "bg-gray-300";
          medal = "";
          bgColor = "bg-gray-100";
      }

      const playerEntry = document.createElement("div");
      playerEntry.className = `flex items-center p-3 rounded-xl shadow-sm ${bgColor}`;
      playerEntry.innerHTML = `
                <div class="flex items-center gap-4">
                    <span class="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${rankColor}">${rank}</span>
                    <div class="w-8 h-8 rounded-full bg-cover bg-center" style="background-image: url('${
                      player.avatar && player.avatar.startsWith("http")
                        ? player.avatar
                        : "https://placehold.co/40x40/e2e8f0/334155?text=" +
                          player.name.charAt(0)
                    }');"></div>
                    <span class="font-semibold text-gray-800">${
                      player.name
                    } ${medal}</span>
                </div>
                <div class="ml-auto text-right">
                    <span class="font-bold text-lg text-amber-800">${
                      player.poin
                    }</span>
                    <span class="text-xs text-gray-500 block">Poin</span>
                </div>
            `;
      leaderboardContainer.appendChild(playerEntry);

      rank++; // Naikkan peringkat untuk pemain selanjutnya
    });
  } catch (error) {
    console.error("Gagal memuat leaderboard:", error);
    leaderboardContainer.innerHTML =
      '<p class="text-center text-red-500">Gagal memuat peringkat. Coba lagi nanti.</p>';
  }
};
/* #endregion */
