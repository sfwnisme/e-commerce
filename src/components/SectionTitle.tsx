const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="text-black text-xl md:text-2xl font-bold uppercase mb-8 flex items-center">
      <span className="block bg-blue-500 h-6 w-1 mr-2 rounded-sm"></span>{" "}
      {title || "Loading..."}
    </h1>
  );
};

export default SectionTitle;
