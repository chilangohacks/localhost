const TextInput = (props) => {
  const { label, name, value, onChange, className, placeholder, password } =
    props;

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <label htmlFor={name} className="text-gray-800 dark:text-gray-200">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white p-3 rounded-md w-full my-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        type={password ? "password" : "text"}
      />
    </div>
  );
};

export { TextInput };
