import dynamic from "next/dynamic";

// Page for submitting application form

const Form = dynamic(() => import("../components/Form"), {
  ssr: false,
});

const Navbar = dynamic(() => import("../components/UI/Navbar"), {
  ssr: false,
});

export default function () {
  return (
    <div>
      <Navbar></Navbar>
      <Form></Form>
    </div>
  );
}
