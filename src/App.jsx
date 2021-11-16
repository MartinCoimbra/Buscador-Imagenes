import { Formik, Form, Field } from "formik";
import { useState } from "react";
import "./header.css";
import "./content.css";
import "./article.css";

const App = () => {
  const [photos, setPhotos] = useState();
  const open = (url) => window.open(url);
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            /* llamamos a la api */
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID obpF63pfkw8-tLWZiafCvh9h2xCL7nzTL-OvnFKzraY",
                },
              }
            );
            const data = await response.json();

            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos?.map((x) => {
            return (
              <article key={x.id} onClick={() => open(x.links.html)}>
                <img src={x.urls.regular} />
                <p>{[x.description, x.alt_description].join(" - ")}</p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
