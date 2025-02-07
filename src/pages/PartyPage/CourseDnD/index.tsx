import {
  Dispatch,
  ForwardedRef,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { calculateEndTime, dateToStringHan, formatNegativeHour } from "@/utils";
import { Course, Destination } from "@/types";
import { ConfirmModal } from "@/components";
import dragIcon from "@/assets/svg/dragIcon.svg";
import deleteIcon from "@/assets/svg/x-modal-icon.svg";
import TimeModal from "@/pages/DriverCoursePage/CourseDnD/TimeModal";
import clsx from "clsx";
import RestTimeModal from "./RestTimeModal";
import { postNewDestinationUser } from "@/api/destination";

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  course: Course;
  startDate: string;
  hours: number;
  courseData: Destination[];
  setCourseData: Dispatch<SetStateAction<Destination[]>>;
  startTime: string;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  setStartTime: Dispatch<SetStateAction<string>>;
  baseTime: number;
  shakeCourse?: boolean;
  courseRef?: ForwardedRef<HTMLDivElement>;
}

function CourseDnD({
  name,
  setName,
  course,
  startDate,
  hours,
  courseData,
  setCourseData,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  baseTime,
  shakeCourse,
  courseRef,
}: Props) {
  const [showText, setShowText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showRestTimeModal, setShowRestTimeModal] = useState(false);

  const handleChange = useCallback(
    (result: any) => {
      if (!result.destination) return;
      const items = [...courseData];
      const [reorderedItem] = items.splice(result.source.index, 1);

      const isGoingToLastIndex =
        result.destination.index === courseData.length - 1 ||
        result.destination.index === items.length;

      const isGoingToFirstIndex = result.destination.index === 0;

      if (
        reorderedItem.name === "휴식" &&
        (isGoingToLastIndex || isGoingToFirstIndex)
      )
        return;

      items.splice(result.destination.index, 0, reorderedItem);
      setCourseData(items);
    },
    [courseData]
  );

  const deleteHandler = useCallback(
    (targetIndex: number, item: Destination) => {
      const originCourseData = courseData.filter(
        (item) => item.name !== "휴식"
      );
      if (item.name !== "휴식" && originCourseData.length === 2)
        return setShowModal(true);
      setCourseData(courseData.filter((_, index) => index !== targetIndex));
    },
    [courseData]
  );

  const addRestHandler = useCallback(() => {
    const originCourseData = courseData.filter(
      (_, index) => index !== courseData.length - 1
    );
    const lastCourseData = courseData.filter(
      (_, index) => index === courseData.length - 1
    );

    const updateCourseData = [
      ...originCourseData,
      {
        address: "",
        destinationId: -1,
        lat: 0,
        lon: 0,
        name: "휴식",
      },
      ...lastCourseData,
    ];

    setCourseData(updateCourseData);
    setShowRestTimeModal(true);
  }, [courseData]);

  const cancelRestHandler = () => {
    const newCourseData = courseData.filter(
      (item) => item.destinationId !== -1
    );
    setCourseData(newCourseData);
    setShowRestTimeModal(false);
  };

  const addRestTimeHandler = async (time: number) => {
    const result = await postNewDestinationUser({
      address: "휴식",
      content: "휴식",
      images: [""],
      lat: -time,
      lon: 0,
      name: "휴식",
    });

    const newCourseData = courseData.map((item) =>
      item.destinationId === -1
        ? { ...item, destinationId: result.payload.destinationId, lat: -time }
        : item
    );

    setCourseData(newCourseData);
    setEndTime(calculateEndTime(startTime, baseTime, time));
  };

  useEffect(() => {
    if (courseData.length === 0) {
      setCourseData(course.days[0].destinations);
    }
  }, []);

  useEffect(() => {
    if (shakeCourse) setShowText(true);
  }, [shakeCourse]);

  return (
    <div ref={courseRef} className={clsx(shakeCourse && "animate-shake")}>
      <div className="mt-20 font-bold flex flex-col items-center gap-6">
        <input
          type="text"
          className="w-full text-boldblue text-2xl text-center focus:outline-none placeholder:text-darkgray"
          placeholder="일정명을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div
          className={clsx("text-sm", showText ? "text-red-600" : "text-white")}
        >
          {courseData.length === 0 && "여행지를 추가해주세요!"}
        </div>
        <div className="relative flex items-center justify-center md:w-[900px]">
          <p className="text-primary text-lg">{`${dateToStringHan(startDate)} (${hours}시간)`}</p>
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-400 underline font-medium"
            onClick={addRestHandler}
          >
            휴식 추가
          </button>
        </div>
      </div>
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId="courselists">
          {(provided) => (
            <div
              className="courselists bg-skyblue w-full md:w-[900px] my-6 mx-auto border border-primary"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {courseData.map((item, index) => (
                <Draggable
                  draggableId={(item.destinationId * index).toString()}
                  index={index}
                  key={(item.destinationId * index).toString()}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={clsx(
                          "bg-white w-4/5 md:w-[700px] h-[83px] mx-auto text-boldblue text-lg md:text-xl text-bold flex items-center",
                          snapshot.isDragging && "border-2 border-primary"
                        )}
                      >
                        <img
                          src={dragIcon}
                          alt="drag"
                          className="ml-2.5 mr-5"
                        />
                        <div>{item.name}</div>
                        <div
                          className={clsx(
                            "ml-auto",
                            item.name !== "휴식" &&
                              index === 0 &&
                              "cursor-pointer hover:font-bold"
                          )}
                          onClick={() =>
                            item.name !== "휴식" &&
                            index === 0 &&
                            setShowTimeModal(true)
                          }
                        >
                          {item.name !== "휴식"
                            ? index === 0
                              ? startTime
                              : index === courseData.length - 1 && endTime
                            : formatNegativeHour(item.lat)}
                        </div>
                        <button
                          className="mx-3 rounded hover:bg-gray-200"
                          onClick={() => deleteHandler(index, item)}
                        >
                          <img src={deleteIcon} alt="delete" />
                        </button>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={
          "여행지를 더 이상 삭제할 수 없습니다.\n\n(여행지는 최소 2개 이상)"
        }
      />
      <TimeModal
        showModal={showTimeModal}
        setShowModal={setShowTimeModal}
        startTime={startTime}
        setStartTime={setStartTime}
      />
      <RestTimeModal
        showModal={showRestTimeModal}
        setShowModal={setShowRestTimeModal}
        onConfirm={addRestTimeHandler}
        onCancel={cancelRestHandler}
      />
    </div>
  );
}

export default memo(CourseDnD);
