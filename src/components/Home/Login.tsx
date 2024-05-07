import X from "/images/add.png";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

interface LoginProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setShowLogin, setLoggedIn }: LoginProps) {
  const XClick = () => {
    setShowLogin(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("არასწორი ელ-ფოსტა")
      .required("ელ-ფოსტა სავალდებულოა"),
  });

  const handleSubmit = (values: any, actions: FormikHelpers<any>) => {
    actions.setSubmitting(true);
    setLoggedIn(true);
    setShowLogin(false);
  };

  return (
    <div className="bg-white w-[480px] flex flex-col rounded-lg items-center gap-6 p-6 absolute left-1/3 top-1/3">
      <div className="w-full flex justify-end">
        <div className="bg-red-500 rounded-md">
          <img
            onClick={XClick}
            src={X}
            alt="close button"
            className="cursor-pointer"
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold leading-5 text-gray-700">შესვლა</h1>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full flex flex-col gap-2">
            {" "}
            {/* Wrap Formik's child components inside Form */}
            <label
              htmlFor="email"
              className="text-sm font-bold leading-6 text-gray-700"
            >
              ელ-ფოსტა
            </label>
            <Field
              as="input"
              type="email"
              name="email"
              placeholder="Example@redberry.ge"
              className="rounded-xl border border-indigo-600 bg-indigo-50 p-4"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-indigo-600 text-sm font-medium leading-6 text-white px-4 py-2"
            >
              შესვლა
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
