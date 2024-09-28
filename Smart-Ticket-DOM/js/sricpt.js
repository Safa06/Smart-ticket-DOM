// buy tickets e click korle paribahan section e chole jabe

// scrollIntoViewOptions Optional
// A Boolean or an object with the following options:
// {
//   behavior: "auto"  | "instant" | "smooth",
//   block:    "start" | "center" | "end" | "nearest",
//   inline:    "start" | "center" | "end" | "nearest",
// }js/sricpt.js

function scrollToParibahan()
{
    const paribahanPart = document.getElementById('paribahan');
    paribahanPart.scrollIntoView({ behavior: 'smooth' });
}


//SEAT count barano

const allSeat = document.getElementsByClassName('seat-name');
let count = 0;

for (const seat of allSeat)
{
    //console.log(seat);
    seat.style.cursor = 'pointer';


    seat.addEventListener('click', function (e) {
        count = count + 1;
        if (count <= 4) {
            setInnerText('seat-count', count);
            
            seat.style.backgroundColor = 'Mediumseagreen';
            seat.style.color = 'white';
            seat.style.fontWeight = 'bold';
            //seat.style.border = 'thick solid green';
            
        
            //uporer seat left part ta
            const seatLeft = 40 - count;
            setInnerText('40-seats-left', seatLeft);
         
            //paribahan er seat select, price add er part
            const seatChoiceContainer = document.getElementById('seat-choice');

            const seatNumber = e.target.innerText;
            const li1 = document.createElement('li');
            li1.style.listStyle = 'none';
            li1.innerText = seatNumber;
            li1.style.fontWeight = 'normal';

            const economyChoiceContainer = document.getElementById('economy-choice');
            const li2 = document.createElement('p');
            li2.style.listStyle = 'none';
            li2.innerText = 'Economy';
            li2.style.fontWeight = 'normal';

            const priceChoiceContainer = document.getElementById('price-choice');
            const li3 = document.createElement('p');
            li3.style.listStyle = 'none';
            li3.innerText = '550';
            li3.style.fontWeight = 'normal';

            // const seatChoice = document.getElementById('seat-all-choice');
            // li1.appendChild(li2);
            // li1.appendChild(li3);
            // seatChoice.appendChild(li1);

            seatChoiceContainer.appendChild(li1);
            economyChoiceContainer.appendChild(li2);
            priceChoiceContainer.appendChild(li3);


            
            //total-price
            const priceNew = parseFloat(priceChoiceContainer.childNodes[1].innerText);
            totalCost('total-price', priceNew);

            
            //coupon apply
            const couponPlace = document.getElementById('coupon-place');
            
            const applyBtn = document.getElementById('apply-btn');
           

            couponPlace.addEventListener('keyup', function () {
                if (couponPlace.value.trim() !== '') {
                    applyBtn.disabled = false;
                    
                }
                else {
                    applyBtn.disabled = true;
                }
            });
            applyBtn.addEventListener('click', function () {
                if (couponPlace.value === 'NEW15') {
                    grandTotalCost('grand-total-cost', priceNew, 15);
                }
                else if (couponPlace.value === 'COUPLE20') {
                 grandTotalCost('grand-total-cost', priceNew, 20);

                }
                else {
                    alert('Coupon code is wrong ! ');
                    couponPlace.value = '';
                    grandTotalCost('grand-total-cost', priceNew, 0);
                    
                }
            });
            


            // next btn - confirmation of ticket
            const passengerName = document.getElementById('passenger-name');
            const phoneNumber = document.getElementById('phone-number');

            const nextBtn = document.getElementById('next-btn');

            passengerName.addEventListener('keyup', function () {
                 phoneNumber.addEventListener('keyup', function () {
                    if ((passengerName.value.trim() !== '') && (phoneNumber.value.trim() !== '')) {
                        nextBtn.disabled = false;
                    }
                    else {
                        nextBtn.disabled = true;
                    }
                });
            });
                
            nextBtn.addEventListener('click', function () {
                hideSection('nav-part');
                hideSection('bg-part');
                hideSection('offer-part');
                hideSection('paribahan');
                hideSection('seat-part');
                hideSection('footer-part');
                showSection('success-part');

                //contibue btn from success part

                document.getElementById('continue-btn').addEventListener('click', function () {
                showSection('nav-part');
                showSection('bg-part');
                showSection('offer-part');
                showSection('paribahan');
                showSection('seat-part');
                showSection('footer-part');
                hideSection('success-part');
                })


            });


        }


        
        else {
            window.alert('Sorry! You have reached your limit. One customer can buy 4 tickets at a time !');
        }
        })
}



function setInnerText(id, value)
{
    document.getElementById(id).innerText = value;
}
            

function totalCost(id,value) {
    const totalCost = document.getElementById(id);
    const totalCostInt = parseFloat(totalCost.innerText);
    const finalTotalPrice = (value + totalCostInt);
    totalCost.innerText = finalTotalPrice;
    totalCost.value = '';
}


function grandTotalCost(id, value, discount) {
    const grandTotalCost = document.getElementById(id);
    const grandTotalCostInt = parseFloat(grandTotalCost.innerText);
    const grandFinalTotalPrice = (value + grandTotalCostInt);
    const discountPriceFull = grandFinalTotalPrice - (discount * (1 / 100));
    const discountPrice = discountPriceFull.toFixed(2);
    grandTotalCost.innerText = discountPrice;
    

}



function hideSection(id)
{
    document.getElementById(id).classList.add('hidden');
}

function showSection(id)
{
    document.getElementById(id).classList.remove('hidden');
}
