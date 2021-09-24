import { useState } from "react";
import { connect } from "react-redux";
import { settingskeys, surroundedbrackets } from "../formsetup";
import { createMapDispatchtoProps } from "../reducers/createDefaultreducer";
import Forminputcomponent from "./Forminputcomponent";

function Forminput({
  entries,
  hmargin = 20,
  vmargin = 20,
  handleCapture,
  id,
  u_system,
  isfocusinput,
}) {
  let [[state, setState], [status, setStatus], [entrielengh, setEntrielength]] =
    [
      useState({}),
      useState(""),
      useState(
        entries
          .filter(([key]) => settingskeys.indexOf(key) === -1)
          .reduce((prev, [key, value]) => ({ ...prev, [key]: 1 }), {})
      ),
    ];
  console.log(isfocusinput);

  const handleFocus = (ev, val) => {
    if (val != isfocusinput) {
      u_system("isfocusinput", val);
    }
  };

  const handlekeyUp = (event) => {
    let keys = surroundedbrackets(event.target.name).reverse();
    let resolve = (object, keys) =>
      keys.length > 0
        ? keys.reduce((prev, curr) => prev[curr] || {}, object)
        : object;
    if (keys.length > 0) {
      let { 1: obj } = keys.reduce(
        (prev, curr, index) => {
          prev[0].shift();
          return [
            prev[0],
            {
              [curr]:
                index == 0
                  ? prev[1]
                  : { ...resolve(state, prev[0].reverse())[curr], ...prev[1] },
            },
          ];
        },
        [[...keys], event.target.value]
      );
      setState({ ...state, ...obj });
    } else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  };

  const validate = (object, vregex = false) =>
    (vregex || entries)
      .filter(
        ([key]) =>
          settingskeys.indexOf(key) === -1 &&
          Object.keys(object).indexOf(key) != -1
      )
      .every(([key, { regex }]) => (object[key] || "").match(regex || ".{1,}"));

  const isValid = () => {
    let keys = Object.keys(state);
    return keys.every((e) => {
      if (
        Object.keys(state[e] || {}).filter(
          (e) => settingskeys.indexOf(e) === -1
        ).length > 0
      ) {
        let {
          0: {
            1: { object = false },
          },
          0: entrie,
        } = [entries.find(([key]) => key === e)];

        if (object) {
          return Object.keys(state[e])
            .filter((e) => settingskeys.indexOf(e) === -1)
            .every((ee) => {
              return validate(state[e][ee], Object.entries(entrie[1]));
            });
        } else {
          return validate({ [e]: state[e] });
        }
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid()) {
      setStatus("state is valid " + JSON.stringify(state));

      delete state.confirmpassword;

      handleCapture(state);
    } else {
      setStatus("state is not valid " + JSON.stringify(state));
    }
  };

  return [
    <form
      onFocus={(ev) => handleFocus(ev, true)}
      onBlur={(ev) => handleFocus(ev, false)}
      id={id}
      onSubmit={handleSubmit}
      onChange={handlekeyUp}
      className={`col nmar_b${vmargin} nmar_t${vmargin} nmar_l${hmargin} nmar_r${hmargin} `}
    >
      {entries.map((e) =>
        Forminputcomponent(e, {
          vmargin,
          hmargin,
          items: entrielengh[e[0]],
          setItems: (key) => {
            setEntrielength({
              ...entrielengh,
              [key]: (entrielengh[key] || 0) + 1,
            });
          },
        })
      )}
    </form>,
    <div className="corebox_2 items_center row">{status}</div>,
  ];
}

const mapStatetoProps = ({ system: { isfocusinput } }) => ({ isfocusinput });
const mapDispatchtoProps = createMapDispatchtoProps();
export default connect(mapStatetoProps, mapDispatchtoProps)(Forminput);
