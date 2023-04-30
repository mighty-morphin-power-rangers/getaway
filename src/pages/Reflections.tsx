import React, { useState } from 'react';

const Reflections = () => {
const [reflection, setReflection] = useState("");
const date = new Date().toLocaleDateString();

const handleReflectionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
setReflection(event.target.value);
};

const handleSaveReflection = () => {
  console.log(`Reflection for ${date}: ${reflection}`);
};

return (
<div>
<h1>Reflections, yo!</h1>
<p>{date}</p>
<textarea value={reflection} onChange={handleReflectionChange} />
<button onClick={handleSaveReflection}>Save Reflection, dawg</button>
</div>
);
};

export default Reflections;