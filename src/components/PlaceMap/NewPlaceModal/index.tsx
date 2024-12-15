import {
  Dispatch,
  FormEvent,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { uploadImage } from "../../../api/image";
import { postNewDestinationUser } from "../../../api/destination";
import { Destination, Place } from "../../../types";
import axios from "axios";
import pointMarker from "../../../assets/svg/point_marker.svg";
import PlaceFormModal from "./PlaceFormModal";
import ConfirmModal from "../../ConfirmModal";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  markerData: Destination[];
  searchKeyword: string;
  courseData?: Destination[];
  setCourseData?: Dispatch<SetStateAction<Destination[]>>;
}

function NewPlaceModal({
  showModal,
  setShowModal,
  markerData,
  searchKeyword,
  courseData,
  setCourseData,
}: Props) {
  const Tmapv2 = window.Tmapv2;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const lastTouchTime = useRef<number>(0);
  const [keyword, setKeyword] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [newPlaceInfo, setNewPlaceInfo] = useState<Place>({
    address: "",
    content: "",
    images: [],
    lat: 0,
    lon: 0,
    name: "",
    destinationId: 0,
    views: 0,
    avgRate: null,
    reviews: [],
    dibs: false,
  });

  const margin = useMemo(
    () => ({
      left: 50,
      top: 100,
      right: 50,
      bottom: 100,
    }),
    []
  );

  const submitNewPlace = useCallback(async () => {
    if (loading) return;
    if (newPlaceInfo.name === "") return alert("여행지 이름을 입력해주세요.");

    try {
      setLoading(true);
      const imagesURL = await Promise.all(
        newPlaceInfo.images.map(async (image) =>
          typeof image === "string" ? image : await uploadImage(image)
        )
      );
      const body = {
        ...newPlaceInfo,
        images: imagesURL,
      };
      const result = await postNewDestinationUser(body);
      if (courseData && setCourseData)
        setCourseData([
          ...courseData,
          { ...newPlaceInfo, destinationId: result.payload.destinationId },
        ]);
      setShowFormModal(false);
      setMessage("여행 일정에 추가되었습니다.");
    } catch (e) {
      console.log(e);
      setMessage("여행지 등록에 실패했습니다.");
    } finally {
      setLoading(false);
      setShowMessageModal(true);
    }
  }, [loading, newPlaceInfo, courseData]);

  const initTmap = useCallback(() => {
    if (!mapRef.current) return;
    if (mapRef.current.firstChild)
      mapRef.current.removeChild(mapRef.current.firstChild);

    const mapWidth = mapRef.current.offsetWidth;
    const mapHeight = 400;

    const map = new Tmapv2.Map("NewPlaceTMapApp", {
      center: new Tmapv2.LatLng(markerData[0].lat, markerData[0].lon),
      width: mapWidth + "px",
      height: mapHeight + "px",
      zoom: 12,
      zoomControl: false,
      scrollwheel: true,
    });

    const PTbounds = new Tmapv2.LatLngBounds();

    markerData.forEach((marker) => {
      PTbounds.extend(new Tmapv2.LatLng(marker.lat, marker.lon));
    });

    map.fitBounds(PTbounds, margin);
  }, [mapRef, Tmapv2, margin, markerData]);

  const searchHandler = useCallback(
    (event?: FormEvent<HTMLFormElement>) => {
      if (event) event.preventDefault();

      axios
        .get(
          "https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result",
          {
            params: {
              searchKeyword: event ? keyword : searchKeyword,
              resCoordType: "EPSG3857",
              reqCoordType: "WGS84GEO",
              count: 10,
            },
            headers: {
              appKey: "LIHlK57F95ZD6UmkA64A70kzkmyX7OP6vg9ovtdg",
            },
          }
        )
        .then((response) => {
          const resultpoisData = response.data.searchPoiInfo.pois.poi;

          if (!mapRef.current) return;
          if (mapRef.current.firstChild)
            mapRef.current.removeChild(mapRef.current.firstChild);

          const mapWidth = mapRef.current.offsetWidth;
          const mapHeight = 400;

          const noorLat = Number(resultpoisData[0].noorLat);
          const noorLon = Number(resultpoisData[0].noorLon);
          const pointCng = new Tmapv2.Point(noorLon, noorLat);
          const projectionCng = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
            pointCng
          );
          const lat = projectionCng._lat;
          const lon = projectionCng._lng;

          const map = new Tmapv2.Map("NewPlaceTMapApp", {
            center: new Tmapv2.LatLng(lat, lon),
            width: mapWidth + "px",
            height: mapHeight + "px",
            zoom: 12,
            zoomControl: false,
            scrollwheel: true,
          });

          const positionBounds = new Tmapv2.LatLngBounds();

          for (let k in resultpoisData) {
            const noorLat = Number(resultpoisData[k].noorLat);
            const noorLon = Number(resultpoisData[k].noorLon);
            const name = resultpoisData[k].name;
            const telNo = resultpoisData[k].telNo;
            const address =
              resultpoisData[k].newAddressList.newAddress[0].fullAddressRoad;

            const pointCng = new Tmapv2.Point(noorLon, noorLat);
            const projectionCng =
              new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(pointCng);

            const lat = projectionCng._lat;
            const lon = projectionCng._lng;

            const markerPosition = new Tmapv2.LatLng(lat, lon);

            const tmapMarker = new Tmapv2.Marker({
              position: markerPosition,
              map: map,
              animation: Tmapv2.MarkerOptions.ANIMATE_BOUNCE_ONCE,
              animationLength: 500,
              title: name,
              label: name,
              icon: pointMarker,
            });

            positionBounds.extend(markerPosition);

            tmapMarker._htmlElement.className = "cursor-pointer";
            tmapMarker.addListener("click", () => {
              setNewPlaceInfo({
                address: `${address} (${telNo})`,
                content: "",
                images: [],
                lat: lat,
                lon: lon,
                name: name,
                destinationId: 0,
                views: 0,
                avgRate: null,
                reviews: [],
                dibs: false,
              });
              setShowFormModal(true);
            });
            tmapMarker.addListener("touchstart", () => {
              const currentTime = Date.now();
              const timeDifference = currentTime - lastTouchTime.current;

              if (timeDifference < 300) {
                setNewPlaceInfo({
                  address: `${address} (${telNo})`,
                  content: "",
                  images: [],
                  lat: lat,
                  lon: lon,
                  name: name,
                  destinationId: 0,
                  views: 0,
                  avgRate: null,
                  reviews: [],
                  dibs: false,
                });
                setShowFormModal(true);
              }

              lastTouchTime.current = currentTime;
            });
          }
          map.fitBounds(positionBounds, margin);
        })
        .catch((e) => console.log(e));
    },
    [mapRef, keyword, Tmapv2, margin, searchKeyword]
  );

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(({ target }: MouseEvent) => {
    if (modalRef.current === target) closeModal();
  }, []);

  useEffect(() => {
    if (!showModal) {
      if (mapRef.current && mapRef.current.firstChild)
        mapRef.current.removeChild(mapRef.current.firstChild);
      document.body.classList.remove("overflow-hidden");
      return;
    }
    document.body.classList.add("overflow-hidden");

    if (markerData.length === 0) {
      if (mapRef.current && mapRef.current.firstChild)
        mapRef.current.removeChild(mapRef.current.firstChild);

      const mapWidth = mapRef.current?.offsetWidth || window.innerWidth;
      const mapHeight = 400;

      new Tmapv2.Map("NewPlaceTMapApp", {
        center: new Tmapv2.LatLng(37.398195688134, 126.96313827598239),
        width: mapWidth + "px",
        height: mapHeight + "px",
        zoom: 14,
        zoomControl: false,
        scrollwheel: true,
      });
    } else initTmap();

    setKeyword(searchKeyword);
    searchHandler();
  }, [showModal]);

  return createPortal(
    <>
      <div
        className={clsx(
          "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
          showModal && "active"
        )}
        ref={modalRef}
        onClick={modalOutSideClick}
      >
        <div
          className={clsx(
            "mx-auto mt-auto md:my-auto shadow w-full max-w-[700px] rounded-xl md:translate-y-0 duration-700",
            showModal ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="h-full bg-white rounded-t-xl relative">
            <div className="px-6 pt-5">
              <p className="text-lg font-bold text-black mb-1">
                새로운 여행지 추가
              </p>
              <p className="text-sm font-medium text-boldgray">
                새로운 여행지의 이름을 검색해주세요.
              </p>
            </div>
            <button
              type="button"
              className="absolute top-4 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={closeModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="py-6 pl-6 pr-4 mx-auto h-[530px] bg-white custom-scrollbar">
              <form className="mb-6 flex gap-2" onSubmit={searchHandler}>
                <input
                  type="text"
                  name="new_place"
                  className="bg-lightgray text-black text-sm rounded-lg focus:outline-none w-full h-12 px-2.5"
                  placeholder="여행지의 이름을 입력해 주세요."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  type="submit"
                  className="shrink-0 w-20 bg-skyblue text-sm text-primary rounded-lg border border-primary"
                >
                  검색
                </button>
              </form>
              <div
                id="NewPlaceTMapApp"
                className="w-full mx-auto"
                ref={mapRef}
              />
            </div>
            <div className="block md:hidden w-full px-5 pb-5">
              <button
                className="w-full h-12 bg-primary text-white text-sm text-bold rounded-lg"
                onClick={() => closeModal()}
              >
                닫기
              </button>
            </div>
          </div>
          <button
            className="hidden md:block w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
            onClick={() => closeModal()}
          >
            닫기
          </button>
        </div>
      </div>
      <PlaceFormModal
        showModal={showFormModal}
        setShowModal={setShowFormModal}
        newPlaceInfo={newPlaceInfo}
        setNewPlaceInfo={setNewPlaceInfo}
        submitNewPlace={submitNewPlace}
      />
      <ConfirmModal
        showModal={showMessageModal}
        setShowModal={setShowMessageModal}
        message={message}
      />
    </>,
    document.body
  );
}

export default memo(NewPlaceModal);
