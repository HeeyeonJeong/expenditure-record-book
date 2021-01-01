import { useState } from 'react';

//useInput hook
function UseInput(initialInput) {
  const [inputs, setInputs] = useState(initialInput);

  const reset = () => {
    setInputs(initialInput);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  return [inputs, onChange, reset];
}

export default UseInput;
