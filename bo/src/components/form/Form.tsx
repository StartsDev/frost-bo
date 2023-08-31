import styles from "./form.module.css";

type Fields = {
  name: string
  type: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string
}

type Props = {
  fields: Fields[]
  action: () => void
  btnText: string
}

function Form({ fields, action, btnText }: Props){
  return (
    <div
        className={styles?.container}
        style={{
            width: "100%",
            height: "100%",
            padding: "1rem 1rem",
        }}
    >
      {fields.map((field, index) => (
        <div key={index} className={styles?.formRow}>
          <label htmlFor={field.name} className={styles?.formLabel}>{field.label}</label>
          <input
            className={styles?.formInput}
            type={field.type}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
          />
        </div>
      ))}
      <div className={styles?.buttonContainer}>
        <button onClick={action}>{btnText}</button>
      </div>
    </div>
  );
};

export default Form;
