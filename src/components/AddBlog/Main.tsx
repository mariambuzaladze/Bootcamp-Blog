import Arrow from "/images/Arrow.png";
import Folder from "/images/folder-add.png";
import Label from "./Label";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormValues {
  author: string;
  title: string;
  description: string;
  date: string;
  category: string;
  email: string;
}

export default function Main() {
  const [formValues, setFormValues] = useState<FormValues>({
    author: "",
    title: "",
    description: "",
    date: "",
    category: "",
    email: "",
  });

  const validationSchema = Yup.object().shape({
    author: Yup.string()
      .matches(/^[\u10A0-\u10FF\s]+$/, "მხოლოდ ქართული სიმბოლოები")
      .min(4, "მინიმუმ 4 სიმბოლო")
      .test("მინიმუმ 2 სიტყვა", "მინიმუმ 2 სიტყვა", (value) => {
        const words = value ? value.trim().split(/\s+/) : [];
        return words.length >= 2;
      })
      .required("ავტორი სავალდებულოა"),
    title: Yup.string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .required("სათაური სავალდებულოა"),
    description: Yup.string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .required("აღწერა სავალდებულოა"),
    date: Yup.date().required("თარიღი სავალდებულოა"),
    category: Yup.string().required("კატეგორია სავადებულოა"),
    email: Yup.string()
      .email("არასწორი ელ-ფოსტა")
      .required("ელ-ფოსტა სავალდებულოა"),
  });

  const initialValues: FormValues = {
    author: "",
    title: "",
    description: "",
    date: "",
    category: "",
    email: "",
  };

  const handleSubmit = (
    values: FormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    localStorage.setItem("formValues", JSON.stringify(values));

    setFormValues(values);
    setSubmitting(false);
  };

  useEffect(() => {
    const storedValues = localStorage.getItem("formValues");
    if (storedValues) {
      setFormValues(JSON.parse(storedValues));
    }
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen flex relative justify-center py-[40px] px-[76px]">
      <img
        src={Arrow}
        alt="arrow"
        className="absolute left-[76px] rounded-full sm:block hidden cursor-pointer"
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting)
        }
      >
        {(formik) => (
          <Form className="flex flex-col gap-[40px]">
            <h1 className="text-2xl font-bold leading-tight text-gray-800">
              ბლოგის დამატება
            </h1>

            <div className="flex flex-col gap-6">
              <Label htmlForValue="blogImage" labelText="ატვირთეთ ფოტო" />
              <Field
                as="input"
                type="file"
                accept="image/*"
                name="blogImage"
                hidden
              />
              <div
                id="image-view"
                className="w-96 h-48 border-dashed border border-gray-300 rounded-lg bg-purple-100 flex flex-col justify-center items-center gap-6"
              >
                <img id="uploaded-image" src={Folder} alt="folder logo" />
                <p className="text-gray-700 text-base font-normal leading-5">
                  ჩააგდეთ ფაილი აქ ან {""}
                  <span className="font-medium underline cursor-pointer">
                    აირჩიეთ ფაილი
                  </span>
                </p>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlForValue="author" labelText="ავტორი*" />
                  <Field
                    as="input"
                    type="text"
                    name="author"
                    placeholder="შეიყვნეთ ავტორი"
                    className="border border-gray-300 rounded-lg p-3"
                  />
                  <ErrorMessage
                    name="author"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlForValue="title" labelText="სათაური*" />
                  <Field
                    as="input"
                    type="text"
                    name="title"
                    placeholder="შეიყვნეთ სათაური"
                    className="border border-gray-300 rounded-lg p-3"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <Label htmlForValue="description" labelText="აღწერა*" />
              <Field
                as="textarea"
                name="description"
                id="description"
                placeholder="შეიყვნეთ აღწერა"
                className="p-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlForValue="date"
                    labelText="გამოქვეყნების თარიღი*"
                  />
                  <Field
                    as="input"
                    type="date"
                    name="date"
                    placeholder=""
                    className="border border-gray-300 rounded-lg p-3"
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlForValue="category" labelText="კატეგორია*" />
                  <Field
                    as="input"
                    type="text"
                    name="category"
                    placeholder="აირჩიეთ კატეგორია"
                    className="border border-gray-300 rounded-lg p-3"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <Label htmlForValue="email" labelText="ელ-ფოსტა" />
              <Field
                as="input"
                type="email"
                name="email"
                placeholder="Example@redberry.ge"
                className="border border-gray-300 rounded-lg p-3"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              className={`py-2 px-5 sm:px-10 rounded-lg leading-snug text-white ${
                formik.isValid ? "bg-blue-500 " : "bg-gray-300"
              }`}
              disabled={formik.isSubmitting}
            >
              გამოქვეყნება
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
