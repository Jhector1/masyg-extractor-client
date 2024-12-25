import {Table} from "../../../../tool/Table";
import {exportToExcel} from "../../../../helper.ts";
import {ApiResponse} from "../../../../type.ts";
import { useAuth } from "../../../../context/index.tsx";
interface MasygCombinerProps{
    data: ApiResponse[];
    handleSaveData: ()=> void;
    openSubscriptionModal: ()=> void;
}
export function MasygCombiner({data, openSubscriptionModal, handleSaveData}:MasygCombinerProps ) {
  const {state} = useAuth();
    return (<>
        {' '}
        <h2 className='text-lg font-semibold text-gray-700 mt-6'>Uploaded Data:</h2>
        <div className='mt-4'>
            {data && data.length > 0 ? (
                <Table keywords={data}/>
            ) : (
                <p className='text-gray-500 text-sm'>No data uploaded yet.</p>
            )}
        </div>
        <button
            onClick={() => {
              if(state.user?.isSubscribed)exportToExcel(data, handleSaveData);
              else openSubscriptionModal();


            }}
            className='mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
            Export to Excel
        </button>
    </>);

}