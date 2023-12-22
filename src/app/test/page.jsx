import React from "react";

export default function TestPage() {
  const handleForm = async (formData) => {
    "use server";
    //bu fonk içinde olan her şey server'da run edilecek
    console.log(formData);
    const username = formData.get("username"); //inputtaki name alanının tuttuğu değeri alıyorum
    console.log("hello,", username);
  };
  return (
    <div>
      <form action={handleForm}>
        <input type="text" className="bg-red-600" name="username" />
        {/* name'in işlevi :  { name: 'username', value: 'inputa girilen text' } */}
        <button>Send</button>
      </form>
    </div>
  );
}
