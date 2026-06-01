import { useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

function VerifyEmail() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // SEND OTP
  const sendOTP = async () => {

    const { error } =
      await supabase.auth.signInWithOtp({
        email,
      });

    if (error) {

      toast.error(error.message);

    } else {

      toast.success("OTP sent 📩");
    }
  };

  // VERIFY OTP
  const verifyOTP = async () => {

    const { error: otpError } =
      await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

    if (otpError) {

      toast.error("Invalid OTP");
      return;
    }

    // GET SIGNUP DATA
const signupData =
  JSON.parse(
    localStorage.getItem("signupData")
  );
  console.log(
  "SIGNUP DATA:",
  signupData
);

console.log(
  "ROLE:",
  signupData.role
);

console.log(
  "COLLEGE:",
  signupData.college
);

// GET CURRENT VERIFIED USER
const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {

  toast.error(
    "User verification failed"
  );

  return;

}

// SET PASSWORD
const {
  error: updatePasswordError,
} = await supabase.auth.updateUser({

  password:
    signupData.password,

});

if (updatePasswordError) {

  console.log(
    "PASSWORD ERROR:",
    updatePasswordError
  );

  toast.error(
    updatePasswordError.message
  );

  return;

}



// CREATE PROFILE
const { error: profileError } =
  await supabase
    .from("profiles")
    .insert([{

      id: user.id,

      full_name:
        signupData.fullName,

      username:
        signupData.username,

      college_id:
        signupData.college,

      role:
        signupData.role,

approval_status:

  signupData.role ===
  "college_coordinator"

    ? "pending"

    : "approved",

account_active:

  signupData.role ===
  "college_coordinator"

    ? false

    : true,
    }]);

if (profileError) {

  console.log(
    "PROFILE ERROR:",
    profileError
  );

  toast.error(
    profileError.message
  );

  return;

}

// SUCCESS
toast.success(
  "Account Created 🎉"
);

localStorage.removeItem(
  "signupData"
);

await supabase.auth.signOut();

window.location.href = "/";
  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#020617] text-white">

      <h1 className="text-3xl font-bold">
        Verify Email
      </h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="
          w-[300px]
          p-4
          rounded-xl
          bg-black/30
          border
          border-white/10
        "
      />

      <button
        onClick={sendOTP}
        className="
          px-6
          py-3
          rounded-xl
          bg-blue-500
        "
      >
        Send OTP
      </button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) =>
          setOtp(e.target.value)
        }
        className="
          w-[300px]
          p-4
          rounded-xl
          bg-black/30
          border
          border-white/10
        "
      />

      <button
        onClick={verifyOTP}
        className="
          px-6
          py-3
          rounded-xl
          bg-green-500
        "
      >
        Verify OTP
      </button>

    </div>
  );
}

export default VerifyEmail;