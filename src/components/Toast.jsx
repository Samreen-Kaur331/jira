function Toast({ message }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 border text-sm shadow-xl animate-bounce-in">
      {message}
    </div>
  );
}

export default Toast;