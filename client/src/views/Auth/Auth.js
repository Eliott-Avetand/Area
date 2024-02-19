import axios from "axios";

function Auth() {
    // const route = () => {
    //     axios.get('http://localhost:8000/auth/google')
    //         .then((res) => {
    //             // res vaut ce que tu renvoies depuis le back pour le front
    //             console.log(res);
    //         }).catch((e) => {
    //             // e vaut la même chose mais en version error
    //             console.log(e);
    //         });
    // }

    const route = () => {
        window.open(`http://localhost:8000/auth/google`, "_self");
    }

    return (
        <div>
            <form>
                <h2>Create an account</h2>
                <label htmlFor='firstname'>Firstname
                    <input type="text" name='firstname' id='firstname' placeholder='John' />
                </label>
                <label htmlFor='lastname'>Doe
                    <input type="text" name='lastname' id='lastname' placeholder='Doe' />
                </label>
                <label htmlFor='email'>Email
                    <input type="email" name='email' id='email' placeholder='name@domain.com' />
                </label>
                <label htmlFor="password">Password
                    <input type="password" name='password' id='password' placeholder='create your password' />
                </label>
                <label htmlFor="password">Confirm password
                    <input type="password" name='confirm-password' id='confirm-password' placeholder='confirm your password' />
                </label>
                <input type="submit" value='Next' />
            </form>
            <form>
                <h2>Login</h2>
                <label htmlFor='email'>Email
                    <input type="email" name='email' id='email' placeholder='name@domain.com' />
                </label>
                <label htmlFor="password">Password
                    <input type="password" name='password' id='password' placeholder='create your password' />
                </label>
                <input type="submit" value='Next' />
            </form>
            <input type="submit" value="google" onClick={route} />
            <input type="submit" value="twitter" />
            <input type="submit" value="facebook" />
        </div>
    );
}

export default Auth;
