// main, search
export interface Recipe {
  id: number;
  name: string;
  image: string;
  weight: number;
}

export interface Recipe_detail {
  evaluationList: [];
  ingredientList: [];
  ingredientListIHave: [];
  manualList: [];
  nutrient: {};
  recipe: Recipe;
  userEvaluationInfo: {};
}

// search, mypage
export interface Ingredient {
  id: number;
  name: string;
  largeCategory: string;
  smallCategory: string;
}

// mypage
export interface MyInfomation {
  height: number;
  weight: number;
  gender: string;
  birthDay: Date;
}

// 냉장고

export interface IngredientIHave extends Ingredient {
  expirationDate: Date;

  weight: number;
}

// recipe detail
export interface Manual {
  image: string;
  instruction: string;
  order: number;
}

export interface Review {
  score: number;
  userId: number;
  userName: string;
}

export interface Nutrient {
  // 인덱스 시그니쳐: typescript에서는 string으로 값을 찾을 수 없게 막아놓았다.
  // 사용하는 built-in 함수들에서 정확도를 올리기 위해서 ex) click clock으로 적으면 빨간줄 띄움
  // 그래서 커스텀할때는 이렇게 [index:type]: 반환값: type으로 적어놓아야 함
  [index: string]: number | string;
  biotin: number;
  calcium: number;
  carbohydrate: number;
  cholesterol: number;
  copper: number;
  dietaryFiber: number;
  fat: number;
  folicAcid: number;
  id: string;
  iodine: number;
  iron: number;
  kcal: number;
  magnesium: number;
  manganese: number;
  moisture: number;
  molybdenum: number;
  niacin: number;
  omega3FattyAcids: number;
  pantothenicAcid: number;
  phosphorus: number;
  potassium: number;
  protein: number;
  selenium: number;
  sodium: number;
  sugar: number;
  transFattyAcid: number;
  vitaminB12: number;
  vitaminB6: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  zinc: number;
}

export interface RecipeDetail {
  evaluationList: Review[];
  ingredientList: Ingredient[];
  ingredientListIHave: IngredientIHave[];
  manualList: Manual[];
  nutrient: Nutrient;
  recipe: Recipe;
  userEvaluationInfo: { didEvaluate: boolean; score: number };
}

export interface NutObj {
  name: string;
  value: number;
  scale: string;
}

export interface NutDictionary {
  [index: string]: { name: string; category: number; scale: string };
}

// ------------- dashboard 관련

// 섭취 intake 관련

export interface Intake {
  id: number;
  image: string;
  intakeAmount: number;
  intakeDate: string;
  intakeTargetId: number;
  intakeType: string;
  name: string;
  originalWeight: number;
}