// react core
import { useState, useEffect, useRef, FormEvent } from 'react';
// API
import { fetchMyInfo, modifyMyInfo } from '../../api/myInfo';
// external module
import moment from 'moment';
// external component
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
// custom component

// css, interface
import classes from './MyInfo.module.scss';
import { MyInfomation } from '../../util/interface';
import { useDispatch } from 'react-redux';
import { loginActions } from '../../redux/slice/login';
const MyBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 10px;
  padding: 10px;
`;

const CustomButton = styled(Button)`
  background-color: #2fbca0;
  color: #fff;
  &:hover {
    background-color: #058181;
  }
`;

export default function MyInfo(props: { modifySuccess: () => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [myInfoLoading, setMyInfoLoading] = useState(true);
  const [myInfo, setMyInfo] = useState<MyInfomation | null>(null);
  const weightRef = useRef<HTMLInputElement | null>(null);
  const heightRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();
  useEffect(() => {
    setMyInfoLoading(true);
    (async () => {
      const data: MyInfomation = await fetchMyInfo();
      setMyInfo(data);

      dispatch(loginActions.setUserInfo(data));
    })();

    setMyInfoLoading(false);
  }, []);

  const modifyModalHandler = () => {
    setModalOpen(() => true);
  };
  const handleClose = () => {
    setModalOpen(() => false);
  };
  const modifyUserInfo = async (event: FormEvent) => {
    event.preventDefault();
    const newName = nameRef.current!.value;
    const newWeight = +weightRef.current!.value;
    const newHeight = +heightRef.current!.value;
    const data = await modifyMyInfo({
      name: newName,
      height: newHeight,
      weight: newWeight,
    });

    if (data.success) {
      setMyInfo((prevState) => {
        return {
          ...prevState!,
          height: newHeight,
          weight: newWeight,
          name: newName,
        };
      });
      handleClose();
      props.modifySuccess();
    }
  };
  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MyBox>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mt: 2, ml: 2 }}
          >
            ???????????? ??????
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={modifyUserInfo}>
              <div className={classes.modalContainer}>
                <div>
                  ??????{' '}
                  <span>
                    <input
                      type="text"
                      className={classes.inputName}
                      defaultValue={myInfo?.name}
                      ref={nameRef}
                    />
                  </span>
                </div>
                <div>
                  <div>
                    ???{' '}
                    <span>
                      <input
                        type="number"
                        ref={heightRef}
                        defaultValue={myInfo?.height}
                      />
                    </span>{' '}
                    cm
                  </div>
                  <div>
                    ?????????{' '}
                    <span>
                      <input
                        type="number"
                        ref={weightRef}
                        defaultValue={myInfo?.weight}
                      />
                    </span>{' '}
                    kg
                  </div>
                </div>
              </div>
              <div className={classes.btnContainer}>
                <CustomButton type="submit" variant="contained">
                  ????????????
                </CustomButton>
              </div>
            </form>
          </Typography>
        </MyBox>
      </Modal>{' '}
      <div>
        {!myInfoLoading && (
          <div className={classes.container}>
            <div className={classes.header}>
              <div>
                <div className={classes.title}>????????????</div>
                <div className={classes.modify} onClick={modifyModalHandler}>
                  <span>
                    <BorderColorIcon fontSize="small" />
                  </span>
                  ???????????? ??????
                </div>
              </div>
            </div>
            <div className={classes.main}>
              <div>
                ?????? <span>{myInfo?.name}</span>
              </div>
              <div>
                ??????{' '}
                <span>{myInfo?.gender === 'FEMALE' ? '??????' : '??????'}</span>
              </div>
              <div>
                ?????? ???{' '}
                <span>{moment().year() - moment(myInfo?.birthDay).year()}</span>
                ???
              </div>
              <div>
                ??? <span>{myInfo?.height}</span>cm
              </div>
              <div>
                ????????? <span>{myInfo?.weight}</span>Kg
              </div>
            </div>
            <div className={classes.footer}></div>
          </div>
        )}
      </div>
    </>
  );
}
