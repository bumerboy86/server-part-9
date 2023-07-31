import { Formik, Field, ErrorMessage, Form } from "formik";
import FormContainer from "../../componenst/FormContainer/FormContainer";
import { useEffect, useState } from "react";
import { IUserPre } from "../../interfaces/IUserPre";
import { userFormSchema } from "../../schema/userFormSchema";
import { useAddUserMutation } from "../../store/controllers/userApi";
import styles from "./CreateUserForm.module.css";
import { toast } from "react-toastify";

const CreateUserForm = () => {
    const [ addUser, {isSuccess, data} ] = useAddUserMutation();
    const [ userData ] = useState<IUserPre>({
        password: "",
        email: "",
    })
    
    useEffect(() => {
        isSuccess && toast.success(`Пользователь ${data?.email} добавлен`);
    }, [isSuccess])

    return (
    <FormContainer>
        <Formik
            initialValues={userData}
            validateOnBlur
            validationSchema={userFormSchema}
            onSubmit={async (values, {resetForm}) => {
                await addUser(values);
                resetForm();
            }}
        >
        {({ isValid }) => (
            <Form className={styles.addForm}>
                <Field className={styles.addFormInput} name="email" type="text" placeholder="Введите Email"/>
                <ErrorMessage name="email"component="div"/>
                <Field className={styles.addFormInput} name="password" type="text" placeholder="Введите пароль"/>
                <ErrorMessage name="password"component="div"/>
                <button disabled={!isValid} type="submit">Добавить</button>
            </Form>
        )}
        </Formik>
    </FormContainer>
    )
}

export default CreateUserForm;