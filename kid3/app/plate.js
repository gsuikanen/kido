const PlateState = {
    features: {
        A: 50,
        B: 0,
        C: 0,
    },
};
const RunFeatures = () => {
    PlateState.features.A = PlateItems.reduce(
        (sum,o) => 1*sum + ( o.selected ? o.features.A : 0),
        50
    )
    PlateState.features.B = PlateItems.reduce(
        (sum,o) => 1*sum + ( o.selected ? o.features.B : 0),
        0
    )
    PlateState.features.C = PlateItems.reduce(
        (sum,o) => 1*sum + ( o.selected ? o.features.C : 0),
        0
    )
    renderFeatures()
    console.log('PlateState.features', PlateState.features)
}
const PlateItemSelect = (item) => {
    console.log('PlateItemSelect', item)
    item.selected = !item.selected
    item.selected && item.el.classList.add('selected')
   !item.selected && item.el.classList.remove('selected')
    item.selected && item.elp.classList.add('selected')
   !item.selected && item.elp.classList.remove('selected')
    RunFeatures()
};

const domPlateWrap = document.querySelector(".PlateWrap")
const domItemWrapA = document.querySelector(".itemsA")
const domItemWrapB = document.querySelector(".itemsB")
const domPlateItems = document.querySelector(".plateA .items")
const domFeatureValueA = document.querySelector(".featureA")
const domFeatureValueB = document.querySelector(".featureB")
const domFeatureValueC = document.querySelector(".featureC")

const msgSuccess = document.querySelector(".msgSuccess")
const msgA = document.querySelector(".msgA")
const msgB = document.querySelector(".msgB")
const msgC = document.querySelector(".msgC")


const renderPlateItems = () => {
    PlateItems.map(
        (item, keyIndex) => {
            renderItem(item, keyIndex)
        }
    );
};
const renderFeatures = () => {
    domFeatureValueA.style = `--value: ${PlateState.features.A};`
    domFeatureValueB.style = `--value: ${PlateState.features.B};`
    domFeatureValueC.style = `--value: ${PlateState.features.C};`
    const passedA = PlateState.features.A >= 50
    const passedB = PlateState.features.B >= 60
    const passedC = PlateState.features.C <= 20
    const good = passedA && passedB && passedC
    passedA && msgA.classList.add('hide')
   !passedA && msgA.classList.remove('hide')
    passedB && msgB.classList.add('hide')
   !passedB && msgB.classList.remove('hide')
    passedC && msgC.classList.add('hide')
   !passedC && msgC.classList.remove('hide')
   !good && msgSuccess.classList.add('hide')
    good && msgSuccess.classList.remove('hide')
}
const renderItem = (item, keyIndex) => {
    const elFIGURE = document.createElement('figure')
    const elIMG = document.createElement('img')
    const elIMP = document.createElement('img')
    elIMG.src = `./art/${item.picture}`
    elIMP.src = `./art/${item.picture}`
    elIMG.alt = item.display_name
    elIMP.alt = item.display_name
    elIMP.style = `--x:${item?.platePosition?.x};--y:${item?.platePosition?.y};`
    elFIGURE.classList.add('box')
    elFIGURE.append(elIMG)
    elFIGURE.addEventListener('click', (ev) => PlateItemSelect(item))
    elIMP.addEventListener('click', (ev) => PlateItemSelect(item))
    item.el = elFIGURE
    item.elp = elIMP
    const domParent = keyIndex % 2 ? domItemWrapB : domItemWrapA
    domParent.append(elFIGURE)
    domPlateItems.append(elIMP)
}
// Run

renderPlateItems()
renderFeatures()
