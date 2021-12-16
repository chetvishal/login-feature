import * as yup from 'yup';
import { Formik } from 'formik';

export function LoginForm() {

    const reviewSchema = yup.object({
        email: yup.string().email("Please enter valid email")
            .required("email is required field"),
        password: yup.string().required("password is required field")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase"
            )
            .matches(
                /^(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                "Must Contain, One Number and One Special Case Character"
            )
    })

    return (
        <div className="w-full max-w-xs shadow-lg">
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, actions) => {
                    alert(`successfully loggedIn ${values.email}  ${values.password}`)
                }}
                validationSchema={reviewSchema}
            >
                {
                    (props) => (
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={props.handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" >
                                    Username
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="email"
                                    placeholder="Username"
                                    value={props.values.email}
                                    onChange={props.handleChange('email')}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="******************"
                                    value={props.values.password}
                                    onChange={props.handleChange('password')}
                                />
                                <p className="text-red-500 text-xs italic">{props.errors.email || props.errors.password}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-blue-500 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit">
                                    Sign In
                                </button>
                                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                    href="##">
                                    Forgot Password?
                                </a>
                            </div>
                        </form>




                    )
                }
            </Formik>

        </div>
    )
}

{/* <View style={{ backgroundColor: '#eef2f5' }}>
                                <TextInput
                                    label="Quantity"
                                    mode='outlined'
                                    placeholder="Enter quantity you want to purchase"
                                    value={props.values.quantity}
                                    onChangeText={props.handleChange('quantity')}
                                    keyboardType='numeric'
                                    style={styles.textInput}
                                />
                                <Text style={{
                                    color: 'crimson',
                                    fontWeight: 'bold',
                                    marginBottom: 2,
                                    marginTop: 2,
                                    textAlign: 'center',
                                    fontFamily: 'future-pt-book'
                                }}>{props.touched.quantity && props.errors.quantity}</Text>


                                <Button onPress={props.handleSubmit} style={styles.button} mode="contained" color="black">
                                    Purchase
                                </Button>
                            </View> */}