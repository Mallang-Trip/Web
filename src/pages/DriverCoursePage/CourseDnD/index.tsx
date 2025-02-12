import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Destination } from "@/types";
import dragIcon from "@/assets/svg/dragIcon.svg";
import deleteIcon from "@/assets/svg/x-modal-icon.svg";
import TimeModal from "./TimeModal";
import clsx from "clsx";
import { postNewDestinationUser } from "@/api/destination";
import { calculateEndTime, formatNegativeHour } from "@/utils";
import RestTimeModal from "@/pages/PartyPage/CourseDnD/RestTimeModal";

interface DestinationImage extends Destination {
  image?: string | File;
}

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  hours: number;
  destinations: DestinationImage[];
  setDestinations: Dispatch<SetStateAction<DestinationImage[]>>;
  startTime: string;
  endTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  baseTime: number;
}

function CourseDnD({
  name,
  setName,
  hours,
  destinations,
  setDestinations,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  baseTime,
}: Props) {
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showRestTimeModal, setShowRestTimeModal] = useState(false);

  const handleChange = useCallback(
    (result: any) => {
      if (!result.destination) return;
      const items = [...destinations];
      const [reorderedItem] = items.splice(result.source.index, 1);

      const isGoingToLastIndex =
        result.destination.index === destinations.length - 1 ||
        result.destination.index === items.length;

      const isGoingToFirstIndex = result.destination.index === 0;

      if (
        reorderedItem.name === "휴식" &&
        (isGoingToLastIndex || isGoingToFirstIndex)
      )
        return;

      items.splice(result.destination.index, 0, reorderedItem);
      setDestinations(items);
    },
    [destinations]
  );

  const deleteHandler = useCallback(
    (targetIndex: number) => {
      setDestinations(destinations.filter((_, index) => index !== targetIndex));
    },
    [destinations]
  );

  const addRestHandler = useCallback(() => {
    const originCourseData = destinations.filter(
      (_, index) => index !== destinations.length - 1
    );
    const lastCourseData = destinations.filter(
      (_, index) => index === destinations.length - 1
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

    setDestinations(updateCourseData);
    setShowRestTimeModal(true);
  }, [destinations]);

  const cancelRestHandler = () => {
    const newCourseData = destinations.filter(
      (item) => item.destinationId !== -1
    );
    setDestinations(newCourseData);
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

    const newCourseData = destinations.map((item) =>
      item.destinationId === -1
        ? { ...item, destinationId: result.payload.destinationId, lat: -time }
        : item
    );

    setDestinations(newCourseData);
    setEndTime(calculateEndTime(startTime, baseTime, time));
  };

  return (
    <>
      <div className="mt-20 font-bold flex flex-col items-center gap-6">
        <input
          type="text"
          className="w-full text-boldblue text-2xl text-center focus:outline-none placeholder:text-darkgray"
          placeholder="일정 코스 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="relative flex items-center justify-center md:w-[900px]">
          <p className="text-primary text-lg">{`${hours}시간`}</p>
          {destinations.length > 1 && (
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-400 underline font-medium"
              onClick={addRestHandler}
            >
              휴식 추가
            </button>
          )}
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
              {destinations.map((item, index) => (
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
                              : index === destinations.length - 1 && endTime
                            : formatNegativeHour(item.lat)}
                        </div>
                        <button
                          className="mx-3 rounded hover:bg-gray-200"
                          onClick={() => deleteHandler(index)}
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
    </>
  );
}

export default memo(CourseDnD);
