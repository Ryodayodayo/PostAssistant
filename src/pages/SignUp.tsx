import Header from '../components/Header';
import SignUpForm from  "../components/SignUpForm"
import styles from "./SignUp.module.css"

const SignUp  = () => {
  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  );
};

export default SignUp ;