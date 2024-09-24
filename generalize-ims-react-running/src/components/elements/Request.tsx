// Request.tsx
import React from 'react';

interface RequestProps {
  editableRequest: ToolRequest | null;
  showModal: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: () => void;
  handleCloseModal: () => void;
}

const Request: React.FC<RequestProps> = ({ editableRequest, showModal, handleInputChange, handleSave, handleCloseModal }) => {
  return (
    <>
      {showModal && editableRequest && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="p-4 flex flex-col">
              <div className="mb-2 flex">
                <div className="w-1/2 mr-2">
                  <label className="block text-sm font-bold mb-1">UserID:</label>
                  <input
                    type="text"
                    name="UserID"
                    value={editableRequest.UserID}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    readOnly
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold mb-1">ToolID:</label>
                  <input
                    type="text"
                    name="ToolID"
                    value={editableRequest.ToolID}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-bold mb-1">Quantity Needed:</label>
                <input
                  type="number"
                  name="QuantityNeeded"
                  value={editableRequest.QuantityNeeded}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-bold mb-1">Purpose Of Use:</label>
                <textarea
                  name="PurposeOfUse"
                  value={editableRequest.PurposeOfUse}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-bold mb-1">Additional Comments:</label>
                <textarea
                  name="AdditionalComments"
                  value={editableRequest.AdditionalComments}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Request;
