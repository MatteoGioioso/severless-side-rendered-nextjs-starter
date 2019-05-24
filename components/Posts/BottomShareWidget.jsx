import styled from "styled-components";
import SharingButtons from "./SharingButtons";

const WidgetContainer = styled.div`
  display: flex;
  padding: 2%;
`;

const BottomSharedWidget = ({ url }) => {
  return (
    <WidgetContainer>
      <SharingButtons url={url} />
    </WidgetContainer>
  );
};

export default BottomSharedWidget;
