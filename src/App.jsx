import { Formik, Form, Field } from "formik";
import { useState } from "react";
import "./header.css";

const App = () => {
  const [photos, setPhotos] = useState();
  
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
    </div>
  );
};

export default App;
