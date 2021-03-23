import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "./src";
import Header from "./Header";
import ReactDatePicker from "react-datepicker";
import NumberFormat from "react-number-format";
import ReactSelect from "react-select";
import Mui from "./Mui";
import ButtonsResult from "./ButtonsResult";
import DownShift from "./DownShift";
import AntD from "./AntD";
import DraftExample from "./DraftExample";
import { EditorState } from "draft-js";
import InputMask from "react-input-mask";
import Chakra from "./Chakra";
import "react-datepicker/dist/react-datepicker.css";
import "antd/dist/antd.css";
import "./styles.css";

let renderCount = 0;

const defaultValues = {
  Native: "",
  TextField: "",
  Select: "",
  ReactSelect: { value: "vanilla", label: "Vanilla" },
  Checkbox: false,
  switch: false,
  RadioGroup: "",
  numberFormat: 123456789,
  AntdInput: "Test",
  AntdCheckbox: true,
  AntdSwitch: true,
  AntdSlider: 20,
  AntdRadio: 1,
  downShift: "apple",
  ReactDatepicker: new Date(),
  AntdSelect: "",
  DraftJS: EditorState.createEmpty(),
  MUIPicker: new Date("2020-08-01T00:00:00"),
  country: { code: "AF", label: "Afghanistan", phone: "93" },
  ChakraSwitch: true,
  reactMaskInput: ""
};

function App() {
  const { handleSubmit, reset, setValue, control } = useForm({ defaultValues });
  const [data, setData] = useState(null);
  renderCount++;

  return (
    <form onSubmit={handleSubmit((data) => setData(data))} className="form">
      <div className="container">
        <section>
          <label>React Select</label>
          <Controller
            as={ReactSelect}
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" }
            ]}
            name="ReactSelect"
            isClearable
            control={control}
          />
        </section>

        <section>
          <label>React Datepicker</label>
          <Controller
            control={control}
            name="ReactDatepicker"
            render={(props) => (
              <ReactDatePicker
                className="input"
                placeholderText="Select date"
                onChange={(e) => props.onChange(e)}
                selected={props.value}
              />
            )}
          />
        </section>

        <section>
          <label>NumberFormat</label>
          <Controller
            as={NumberFormat}
            thousandSeparator
            name="numberFormat"
            className="input"
            control={control}
          />
        </section>

        <section>
          <Controller
            render={({ ref, ...rest }) => <DownShift {...rest} />}
            control={control}
            name="downShift"
          />
        </section>

        <section>
          <label>DraftJS</label>
          <DraftExample control={control} />
        </section>

        <section>
          <label>React Input Mask</label>
          <Controller
            name="reactMaskInput"
            control={control}
            render={({ onChange, value }) => (
              <InputMask mask="99/99/9999" value={value} onChange={onChange}>
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="tel"
                    className="input"
                    disableUnderline
                  />
                )}
              </InputMask>
            )}
          />
        </section>
      </div>

      <hr />

      <Chakra control={control} />

      <ButtonsResult {...{ data, reset, setValue }} />
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
