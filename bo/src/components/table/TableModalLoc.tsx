import styles from "./table.module.css";
import { useNavigate } from "react-router-dom";
import { THEME, ITEM_THEME } from "../../theme";
import { Location } from "../../types";

interface MyComponentProps {
  headers: string[] | [];
  items: Location[] | [];
  title: string | undefined;
}

function TableModalLoc({ headers, items, title }: MyComponentProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (title === "Ubicaciones") {
      navigate("/bo/add-location", { replace: true });
    }
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {items.length === 0 && title? (
        <div className={styles.containerMessage}>
          <div className={styles.title}>
            No hay registros de {title.toLowerCase()}
          </div>
          <div className={styles?.buttonContainer}>
            <button onClick={handleClick}>Crear {title.toLowerCase()}</button>
          </div>
        </div>
      ) : (
        <>
          <section
            style={{
              width: "100%",
              height: "20",
              display: "flex",
            }}
          >
            {headers.map((item, index) => {
              return (
                <p
                  key={index}
                  className={styles.headers}
                  style={{ color: THEME.blue, width: "100%" }}
                >
                  {item}
                </p>
              );
            })}
          </section>
          <section
            className={styles.table}
            style={{
              width: "100%",
              height: "140px",
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  padding: "8px",
                  backgroundColor:
                    index % 2 === 0 ? ITEM_THEME.white : ITEM_THEME.blue,
                  color: index % 2 === 0 ? ITEM_THEME.black : ITEM_THEME.black,
                }}
              >
                {item.locationName}
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

export default TableModalLoc;
