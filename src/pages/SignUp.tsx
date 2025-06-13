import Header from '../components/Header';
import SignUpForm from  "../components/SignUpForm"
import styles from "./SignUp.module.css"

const SignUp  = () => {
  return (
    <div>
      <Header />
        <div className = {styles.container}>
          <SignUpForm />
        </div>
    </div>
  );
};

export default SignUp ;