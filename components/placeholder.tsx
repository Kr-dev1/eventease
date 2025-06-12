export const NoDataPlaceholder = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center h-full text-gray-500 text-sm italic">
        {message}
    </div>
);