import { useState } from "react";
import { settingskeys } from "../res/formsetup";

export default function Forminputcomponent(
  settings,
  { vmargin, hmargin, items = 0, setItems = () => 0 }
) {
  let newItem = () => {
    return Object.entries(settings[1])
      .filter(([key]) => settingskeys.indexOf(key) === -1)
      .reduce((prev, [key]) => {
        return { ...prev, [key]: { ...settings[1][key] } };
      }, {});
  };

  let [componentkey, { object, limit }] = settings;

  let margin = `mar_t${vmargin} mar_b${vmargin} mar_l${hmargin} mar_r${hmargin}`;

  let Input = (
    {
      0: key,
      1: {
        limit = false,
        object = false,
        holder = false,
        value = false,
        required = true,
        regex = ".{1,}",
        type = "text",
        maxedcorebox_x = 50,
      },
    },
    { name = false } = {}
  ) => (
    <input
      key={"Forminput" + key}
      name={name || key}
      placeholder={holder || key}
      pattern={regex}
      type={type}
      {...(required ? { required } : {})}
      defaultValue={value || ""}
      className={`corebox_2 border_0 ${margin} maxedcorebox_x${maxedcorebox_x} input_fix0`}
    />
  );

  return object
    ? [
        "0"
          .repeat(items)
          .split("")
          .map((e, i) => (
            <div className="row basis_40">
              {Object.entries(settings[1])
                .filter(([key]) => settingskeys.indexOf(key) === -1)
                .map(([key, value]) =>
                  Input([key, value], {
                    name: `[${componentkey}][${i}][${key}]`,
                  })
                )}
            </div>
          )),
        <input
          type="button"
          className={`col btn_u mar_l${hmargin} mar_r${hmargin} corebox_0 center row f_0 input_fix0`}
          onClick={() => setItems(settings[0])}
          value={`Add ${componentkey} item`}
        />,
      ]
    : Input(settings);
}
