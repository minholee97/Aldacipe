import { useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

// api
import { fetchRecipe } from '../api/detail';

import IngredientContainer from '../components/detail/ingredient/IngredientContainer';

import CheckIcon from '@mui/icons-material/Check';
// css, interface
import classes from './RecipeDetailPage.module.scss';
import { RecipeDetail } from '../util/interface';
// 더미데이터
export default function RecipeDetailPage(props: {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(true);
  const [recipeInfo, setRecipeInfo] = useState<RecipeDetail | null>(null);
  const location = useLocation();

  const { recipeId } = useParams();
  const navigate = useNavigate();
  // console.log(recipeId);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const data = await fetchRecipe(+recipeId!);

      if (data === -1) {
        navigate('/main');
      } else {
        setRecipeInfo(data);
      }
    })();

    setIsLoading(false);
  }, [recipeId, isUpdate]);
  const handleInfoUpdate = () => {
    setIsUpdate((prev) => !prev);
  };
  return (
    <>
      {/* 비동기로 집어넣는 시간이 애매하게 안맞아서 null에서 속성을 꺼낸다고 오류가 남,
       !isLoading만 가지고 안되서 recipeInfo가 !null일때까지 보여주는 방식으로
       
       댓글평점이랑 영양정보 한 페이지에서 보여줄 수 있도록 변경하기
       */}
      {!isLoading && recipeInfo && (
        <div className={classes.backdrop}>
          <div className={classes.wrapper}>
            <div>
              <IngredientContainer
                updateRecipeInfo={handleInfoUpdate}
                recipeInfo={recipeInfo!}
              />
            </div>
            <div className={classes.main}>
              <div className={classes.menus}>
                <div>
                  <NavLink
                    to={`/detail/${recipeId}`}
                    className={() =>
                      location.pathname === `/detail/${recipeId}`
                        ? classes.selected
                        : classes.notselected
                    }
                  >
                    <span>
                      <CheckIcon />
                    </span>
                    요리 방법
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    to={`/detail/${recipeId}/nutScore`}
                    className={({ isActive }) =>
                      isActive ? classes.selected : classes.notselected
                    }
                  >
                    <span>
                      <CheckIcon />
                    </span>
                    영양소 및 리뷰
                  </NavLink>
                </div>
              </div>
              <Outlet context={recipeInfo} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
