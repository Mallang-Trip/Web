import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import ImageInput from "./ImageInput";
import ImageItem from "./ImageItem";
import clsx from "clsx";

interface Props {
  images: (string | File)[];
  setImages: Dispatch<SetStateAction<(string | File)[]>>;
}

function CourseImage({ images, setImages }: Props) {
  const handleChange = useCallback(
    (result: any) => {
      if (!result.destination) return;
      const items = [...images];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setImages(items);
    },
    [images]
  );

  return (
    <div className="flex flex-col gap-2 my-8">
      <p className="text-lg text-black font-bold">일정 코스 이미지</p>
      <div className="flex gap-4 custom-scrollbar">
        <ImageInput images={images} setImages={setImages} />
        <DragDropContext onDragEnd={handleChange}>
          <Droppable droppableId="imagelist" direction="horizontal">
            {(provided) => (
              <div
                className="imagelist flex"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {images.map((image, index) => (
                  <Draggable
                    draggableId={typeof image === "string" ? image : image.name}
                    index={index}
                    key={typeof image === "string" ? image : image.name}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={clsx(
                            "mr-4",
                            snapshot.isDragging &&
                              "ring ring-primary rounded-lg"
                          )}
                        >
                          <ImageItem
                            image={image}
                            images={images}
                            setImages={setImages}
                            index={index}
                            key={index}
                          />
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
      </div>
    </div>
  );
}

export default memo(CourseImage);
