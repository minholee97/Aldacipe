import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import BirthdayInput from '../common/mui/BirthdayInput';

import { debounce } from 'lodash';

// interface - 타입스크립트 인터페이스를 다른 곳에 입력해두고 받아옴
import * as all from './config';
import { emailRegExp, passwordRegExp } from '../../util/regexp';
// css
import classes from './Forms.module.scss';

// components
export const FormContent1: React.FC<{
  formData: all.userInfo;
  stepOneDataHandle: (data: all.form1Data) => void;
}> = (props) => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(
    props.formData.email.length > 0
      ? emailRegExp.test(props.formData.email)
      : false
  );

  // useRef 는 이런식으로 제네릭<null>
  const submitStepOneDataHandler = () => {
    props.stepOneDataHandle({ email: email });
  };

  const checkEmailValid = (event: React.FocusEvent<HTMLInputElement>) => {
    debounce(() => {
      setEmail(event.target.value);

      if (emailRegExp.test(event.target.value)) {
        setEmailValid(() => true);
      } else {
        setEmailValid(() => false);
      }
    }, 500)();
  };
  const enterHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' || !emailValid) {
      return;
    } else {
      props.stepOneDataHandle({ email: email });
    }
  };
  return (
    <div className={classes.wrapper} onKeyDown={enterHandler}>
      <div className={classes.inputContainer}>
        <input
          className={classes.signupInput}
          type="email"
          placeholder="이메일을 입력해 주세요."
          onChange={checkEmailValid}
          defaultValue={props.formData.email}
          autoFocus
        />
        <p className={classes.errorMsg}>
          {email.length > 0 && !emailValid && '유효한 이메일을 입력해 주세요.'}
        </p>
      </div>
      <div className={classes.btnContainer}>
        <div></div>
        <button
          type="button"
          className={`${classes.nextBtn}`}
          onClick={submitStepOneDataHandler}
          disabled={email.length === 0 || !emailValid}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export const FormContent2: React.FC<{
  formData: all.userInfo;
  stepTwoDataHandle: (data: all.form2Data) => void;
  stepBackHandle: () => void;
}> = (props) => {
  const [stepTwoData, setStepTwoData] = useState<all.form2Data>({
    gender: props.formData.gender,
    weight: props.formData.weight,
    height: props.formData.height,
    birthday: props.formData.birthday,
  });

  const [isGenderValid, setIsGenderValid] = useState(
    props.formData.gender.length > 0 ? true : false
  );
  const [isWeightValid, setIsWeightValid] = useState(
    props.formData.weight >= 0 && props.formData.weight <= 300 ? true : false
  );
  const [isHeightValid, setIsHeightValid] = useState(
    props.formData.height >= 0 && props.formData.height <= 300 ? true : false
  );

  const birthdayChangeHandler = (newBirthday: string) => {
    const tmp = newBirthday;
    setStepTwoData((prev) => {
      return { ...prev, birthday: tmp };
    });
  };
  const genderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStepTwoData((prev) => {
      return { ...prev, gender: event.target.value };
    });
    setIsGenderValid(true);
  };
  const heightBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const height = Number(event.target.value);
    if (height >= 0 && height <= 300) {
      setStepTwoData((prev) => {
        return { ...prev, height: height };
      });
      setIsHeightValid(true);
    } else {
      setIsHeightValid(false);
    }
  };
  const weightBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const weight = Number(event.target.value);
    if (weight >= 0 && weight <= 300) {
      setStepTwoData((prev) => {
        return { ...prev, weight: weight };
      });
      setIsWeightValid(true);
    } else {
      setIsWeightValid(false);
    }
  };

  const formStepBackHandler = () => {
    props.stepBackHandle();
  };
  const enterHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      !(isGenderValid && isWeightValid && isHeightValid) ||
      event.key !== 'Enter'
    ) {
      return;
    } else {
      props.stepTwoDataHandle(stepTwoData);
    }
  };
  const submitStepTwoDataHandler = () => {
    props.stepTwoDataHandle(stepTwoData);
  };
  return (
    <div
      className={`${classes.wrapper} ${classes.form2}`}
      onKeyDown={enterHandler}
    >
      <div className={`${classes.form2InputContainer}`}>
        <div className={`${classes.genderContainer}`}>
          <div className={classes.title}>성별</div>
          <div>
            <div>
              <label htmlFor="male">남성</label>
              <input
                type="radio"
                name="gender"
                id="male"
                value="MALE"
                defaultChecked={props.formData.gender === 'MALE'}
                onChange={genderChange}
              />
            </div>
            <div>
              <label htmlFor="female">여성</label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="FEMALE"
                defaultChecked={props.formData.gender === 'FEMALE'}
                onChange={genderChange}
              />
            </div>
          </div>
        </div>

        <div>
          <div className={classes.title}>생년월일</div>
          <BirthdayInput
            birthday={props.formData.birthday}
            changeBirthday={birthdayChangeHandler}
          />
        </div>
      </div>
      <div className={classes.form2InputContainer}>
        <div className={classes.numberInputs}>
          <div>
            <label htmlFor="height">키</label>
            <input
              type="number"
              name="height"
              id="height"
              min={0}
              max={300}
              defaultValue={props.formData.height}
              onBlur={heightBlur}
            />{' '}
            cm
          </div>
          <div>
            <label htmlFor="weight">몸무게</label>
            <input
              type="number"
              name="weight"
              id="weight"
              min={0}
              max={300}
              defaultValue={props.formData.weight}
              onBlur={weightBlur}
            />{' '}
            kg
          </div>
        </div>
      </div>

      <div className={classes.btnContainer}>
        <button
          type="button"
          className={classes.prevBtn}
          onClick={formStepBackHandler}
        >
          이전
        </button>
        <button
          type="button"
          className={classes.nextBtn}
          onClick={submitStepTwoDataHandler}
          disabled={!(isGenderValid && isWeightValid && isHeightValid)}
        >
          다음
        </button>
      </div>
    </div>
  );
};
export const FormContent3: React.FC<{
  formData: all.userInfo;
  stepBackHandle: () => void;
  updatePw: (password: string) => void;
}> = (props) => {
  const [password, setPassword] = useState('');
  const [pwValid, setPwValid] = useState(false);

  useEffect(() => {
    if (pwValid) {
      props.updatePw(password);
    } else {
      props.updatePw('');
    }
  }, [pwValid]);

  const checkPasswordValid = (event: React.FocusEvent<HTMLInputElement>) => {
    const tmp = event.target.value;
    if (tmp.length > 0 && passwordRegExp.test(tmp)) {
      setPassword(() => tmp);
    } else {
      setPassword(() => '');
    }
  };
  const checkPasswordConfirm = (event: React.FocusEvent<HTMLInputElement>) => {
    const pw2 = event.target.value;
    if (password.length > 0 && password === pw2) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const formStepBackHandler = () => {
    props.stepBackHandle();
  };

  return (
    <div className={classes.wrapper}>
      <label htmlFor="password1">비밀번호</label>
      <input
        type="password"
        className={classes.signupInput}
        id="password1"
        onChange={checkPasswordValid}
        autoFocus
      />
      <label htmlFor="password1">비밀번호 확인</label>
      <input
        type="password"
        className={classes.signupInput}
        id="password2"
        onChange={checkPasswordConfirm}
      />
      <div className={classes.btnContainer}>
        <button
          type="button"
          className={classes.prevBtn}
          onClick={formStepBackHandler}
        >
          이전
        </button>
        <button
          type="submit"
          className={classes.nextBtn}
          // onClick={sumbitStepThreeHandler}
          disabled={!pwValid}
        >
          완료
        </button>
      </div>
    </div>
  );
};