

export const TimeRead = () => {
    return (
        <div>
        <div className="p-4  border-slate-200 pb-4 cursor-pointer">
            <div className="flex">
            <img
                src="https://via.placeholder.com/150"
                alt="blog"
                className="  max-h-l pb-2 mx-auto gap-5"
            />
            </div>
            <div className="text-2xl font-semibold mb-3.5 text-black">Title</div>
            <div className="text-base font-regular mb-3.5 text-customColor">
            Content
            </div>
            <div className="text-green-600 text-sm font-thin pt-4 ">
            1 minute(s) read
            </div>
        </div>
        </div>
    );
    }   