export const Title: React.FC = () => {
  return (
    <div className="relative flex flex-col pt-[15%] pb-8 md:pt-[5%]">
      <div className="w-full pl-12 font-mono text-white" aria-hidden="true">
        HI, I'M
      </div>
      <div className="relative flex w-fit min-h-[10rem] items-center justify-center font-graffiti text-[10rem] md:text-[15rem]">
        <h1
          className="relative 
                       before:content-[attr(data-text)] before:absolute before:top-0 before:left-0
                       before:translate-x-1 before:translate-y-1
                       before:text-hot-pink before:opacity-50
                       
                       after:content-[attr(data-text)] after:absolute after:top-0 after:left-0
                       after:-translate-x-1 after:-translate-y-1
                       after:text-electric-blue after:opacity-75"
          data-text="David Spray"
        >
          David Spray
        </h1>
      </div>

      <div className="flex w-full items-end justify-end" aria-hidden="true">
        <span className="text-sm">I WRITE</span>
        <span className="px-2 font-digital text-sm">CODE</span>
      </div>
    </div>
  );
};
