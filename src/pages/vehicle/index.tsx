import React from 'react';
import Table from '../../components/table/index.tsx';
import Loader from '../../components/loader/index.tsx';
import VehicleViewModal from '../../components/vehicleViewModal/index.tsx';
import UpdateVehicleModal from '../../components/updateVehicleModal/index.tsx';
import useVehicle from '../../hooks/useVehicle.tsx';

const Vehicle: React.FC = () => {
  const {
    data,
    contextHolder,
    viewData,
    isLoading,
    pagination,
    isModalOpen,
    isUpdateOpen,
    setIsModalOpen,
    setIsUpdateOpen,
    handleTableChange,
    columns,
  } = useVehicle();

  return (
    <div>
      {contextHolder}
      {isLoading && <Loader />}
      <div className="flex icon justify-between py-7 px-8 border-b border-gray-10">
        <h3 className="text-[24px] text-secondary-60 font-semibold">Vehicles</h3>
      </div>
      <div className="mt-8 px-8">
        <Table
          columns={columns}
          dataSource={data}
          bordered
          onChange={handleTableChange}
          pagination={pagination}
          scroll={{ x: 2500 }}
        />
      </div>
      <VehicleViewModal viewData={viewData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <UpdateVehicleModal
        page={pagination.current}
        limit={pagination.pageSize}
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        viewData={viewData}
      />
    </div>
  );
};

export default Vehicle;
