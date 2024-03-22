import React, { useEffect, useState } from 'react';
import { MdOutlineFullscreen } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { AppState } from '../../redux/store.ts';
import Select from '../../components/select/index.tsx';
import CardColumnComponent from '../../components/card/CardColumn.tsx';
import Button from '../../components/button/index.tsx';
import Input from '../../components/inputField/index.tsx';
import useLiveStatus from '../../hooks/useLiveStatus.ts';
import { SitesInterface } from '../sites/type.ts';
import { getLiveStatusAction, getLiveVehicleAction } from '../../redux/actions/liveStatusCardActions.ts';

interface DataInterface {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardView: React.FC<DataInterface> = ({ isModalOpen, setIsModalOpen }) => {
  const { cardData, deparmentToTitleMap } = useLiveStatus();
  const [searchData, setSearchData] = useState<string>('');
  const [siteId, setSiteId] = useState<string>('');
  const sites = useSelector((state: AppState) => state.sites.sites);
  const userData = useSelector((state: AppState) => state.auth.userData);
  const handleFullScreen = (): void => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getLiveStatusAction({ site_id: siteId, searchData });
    getLiveVehicleAction({ site_id: siteId, searchData });
  }, [siteId]);

  // Debounce the API call function
  const debouncedSearch = debounce(async (searchData: string) => {
    getLiveStatusAction({ site_id: siteId, searchData });
    getLiveVehicleAction({ site_id: siteId, searchData });
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearchData(value);
    debouncedSearch(value);
  };

  return (
    <>
      <div className="px-6">
        <div className="w-full flex justify-between py-7 border-b border-gray-300 items-center">
          <div className="flex items-center gap-4">
            {['super-admin', 'admin', 'manager'].includes(userData.role) ? (
              <div className="w-full">
                <Select
                  placeholder="Select site"
                  className="!max-w-[200px] !w-full"
                  style={{ height: '38px' }}
                  onChange={(value) => setSiteId(value)}
                  options={[
                    { value: '', label: 'All sites' },
                    ...(sites
                      ? sites.map((val: SitesInterface) => ({
                          value: val.site_id,
                          label: val.site_name,
                        }))
                      : []),
                  ]}
                />
              </div>
            ) : (
              <div />
            )}
            <Input
              value={searchData}
              onChange={handleInputChange}
              placeholder="Search Vehicle..."
              className="!max-w-[200px] !w-full"
              style={{}}
            />
          </div>
          {!isModalOpen && (
            <Button onClick={handleFullScreen} className="!font-semibold !flex items-center gap-2" type="primary">
              <MdOutlineFullscreen className="text-[22px]" /> Full screen view
            </Button>
          )}
        </div>
      </div>
      <div className="px-6">
        <div className="w-full overflow-x-auto pb-4">
          <div className="mt-5 flex w-full overflow-x-auto">
            {Object.keys(deparmentToTitleMap).map((key: string) => (
              <CardColumnComponent key={key} title={deparmentToTitleMap[key]} data={cardData[key]} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardView;
