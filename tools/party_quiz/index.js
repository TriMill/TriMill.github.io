let weights = [1, 1, -1, -1, -1, -1, 1, 1, 1, -1];
let scoring = {'d2': -2, 'd1': -1, 'n': 0, 'a1': 1, 'a2': 2};

// Coming soon
let strongDR = '<h2>You are a strong Democratic-Republican</h2><p>You probably live in the countryside and just want the best for your local community. The federal government is too distant from the people to be effective, so state and local governments should have more power.</p>';
let modDR= '<h2>You are a moderate Democratic-Republican</h2><p>You think that, since state governments are closer to the people, they should have more power. Unlike stronger Democratic-Republicans, however, you think the federal government still holds important roles, such as regulating relations between the states.';
let moderate = '<h2>You are a moderate</h2><p>You would like to see a balance of power between local, state, and federal governments. Both sides, it seems to you, don\'t realize how both levels of government play an important role.</p>';
let modFed = '<h2>You are a moderate Federalist</h2>';

function mkRadio(idx, clazz, id) {
  return '<div class="item"><label class="container"><input type="radio" name="ans' + idx + '" value="" class="' + clazz + '" q="' + id + '"><span class="checkmark ' + clazz + '"></span></label></div>'
}

function init() {
  $('#get_results').click(tally);
  let questions = $('.question');
  for(let idx = 0; idx < questions.length; idx++) {
    q = questions[idx];
    id = $(q).attr('id');
    $(q).after(mkRadio(idx, 'a2', id));
    $(q).after(mkRadio(idx, 'a1', id));
    $(q).after(mkRadio(idx, 'n', id));
    $(q).after(mkRadio(idx, 'd1', id));
    $(q).after(mkRadio(idx, 'd2', id));
  }
}

function tally() {
  let score = 0;
  for(let i = 0; i < $('.question').length; i++) {
    let sel = $('input:radio[name=ans' + i + ']:checked');
    if(sel.length == 0) {
      $('#results').html('<p>Make sure you have answered all questions</p>');
      break;
    }
    score += scoring[$(sel[0]).attr('class')] * weights[i];
  }
  if(score <= -14)   $('#results').html('<p>Strong Democratic-Republican</p>');
  else if(score <= -5)   $('#results').html('<p>Moderate Democratic-Republican</p>');
  else if(score <= 4)   $('#results').html('<p>Moderate</p>');
  else if(score <= 13)   $('#results').html('<p>Moderate Federalist</p>');
  else if(score <= 20)   $('#results').html('<p>Strong Federalist</p>');
}
