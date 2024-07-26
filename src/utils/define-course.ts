type TSkill = {
  id: number;
  name: string;
  level: number;
};

type TCursus = {
  id: number;
  created_at: string;
  name: string;
  slug: string;
  kind: string;
};

type TCourse = {
  grade: string | null;
  level: number;
  skills: TSkill[];
  blackholed_at: string | null;
  id: number;
  begin_at: string;
  end_at: string | null;
  cursus_id?: number;
  has_coalition?: boolean;
  created_at?: string;
  updated_at?: string;
  user?: any;
  cursus?: TCursus;
};

export const defineCourse = (courses: TCourse[]): TCourse => {
  // Step 1: Check if every TCourse has end_at filled
  const allEndAtFilled = courses.every((course) => course.end_at !== null);

  if (allEndAtFilled) {
    // Find the item with the latest end_at date
    return courses.reduce((latest, current) => {
      if (new Date(current.end_at!) > new Date(latest.end_at!)) {
        return current;
      } else if (new Date(current.end_at!) === new Date(latest.end_at!)) {
        return courses.indexOf(current) > courses.indexOf(latest)
          ? current
          : latest;
      } else {
        return latest;
      }
    });
  } else {
    // Step 2: Find the one with grade not null
    const filteredCourses = courses.filter((course) => course.grade !== null);

    if (filteredCourses.length > 0) {
      // Find the item with the latest begin_at date
      return filteredCourses.reduce((latest, current) => {
        if (new Date(current.begin_at) > new Date(latest.begin_at)) {
          return current;
        } else if (new Date(current.begin_at) === new Date(latest.begin_at)) {
          return courses.indexOf(current) > courses.indexOf(latest)
            ? current
            : latest;
        } else {
          return latest;
        }
      });
    }
  }

  // Default case, return the last item in the array if no other condition is met
  return courses[courses.length - 1];
};
