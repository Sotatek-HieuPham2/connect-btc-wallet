interface IIntentCard {
    header: string;
    listOfTask: string[];
    nameOfButton: string;
}

const IntentCard = ({ header, listOfTask, nameOfButton }: IIntentCard) => {
    return (
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 w-full max-w-md">
            <h2 className="text-orange-400 text-lg font-semibold mb-4">{header}</h2>

            <ul className="space-y-2 mb-6">
                {listOfTask.map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        {item}
                    </li>
                ))}
            </ul>

            <button className="bg-orange-500 hover:bg-orange-600 text-black font-medium px-4 py-2 rounded-full text-sm transition-colors duration-200">
                {nameOfButton}
            </button>
        </div>
    );
};

export default IntentCard;
